import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { QueryClient, useMutation, useQuery } from "react-query";
import { Avatar, Button, Card, Comment, Input, List, message } from "antd";

import { getUserReviewApi } from "api/review";
import { changeNickNameApi, getUserByIdApi } from "api/user";
import { dehydrate } from "react-query/hydration";
import { useUser } from "hooks/useUser";
import Link from "next/link";
import { useState } from "react";
import { css } from "@emotion/react";

const UserProfile = () => {
  const router = useRouter();
  const {
    query: { userId },
  } = router;
  const { data: reviews } = useQuery(
    ["user", "review", userId],
    getUserReviewApi(userId as string)
  );
  const { data: user, refetch } = useQuery(
    ["user", "profile", userId],
    getUserByIdApi(userId as string)
  );
  const [me, isLoggedIn] = useUser();

  const [editingNickname, setEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const toggleEdit = () => {
    setEditingNickname(!editingNickname);
  };
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewNickname(value);
  };
  const changeNicknameMutation = useMutation(changeNickNameApi);
  const changeNickname = async () => {
    try {
      await changeNicknameMutation.mutateAsync({ nickname: newNickname });
      refetch();
      message.success("닉네임 변경이 완료되었습니다.");
      setEditingNickname(false);
    } catch (error) {
      console.error(error);
      message.error("에러가 발생하였습니다.");
    }
  };

  return (
    <Card
      title={
        <Card.Meta
          avatar={<Avatar>{user.nickname[0]}</Avatar>}
          title={
            editingNickname ? (
              <Input
                value={newNickname}
                onChange={handleNicknameChange}
                maxLength={15}
                css={inputCss}
              />
            ) : (
              user.nickname
            )
          }
          description={
            isLoggedIn &&
            user.id === me.id && (
              <>
                <Button onClick={toggleEdit}>
                  {editingNickname ? "취소" : "닉네임 수정하기"}
                </Button>
                {editingNickname && (
                  <Button type="primary" onClick={changeNickname}>
                    완료
                  </Button>
                )}
              </>
            )
          }
        />
      }
    >
      <h4>작성한 댓글</h4>
      <List
        dataSource={reviews}
        renderItem={(item: any) => (
          <Comment
            avatar={
              <Link href={`/alcoholDetail/${item.alcohol.id}`}>
                <Avatar
                  size="large"
                  src={item.alcohol.thumbnail}
                />
              </Link>
            }
            author={item.alcohol.name}
            content={item.desc}
          />
        )}
      />
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = ctx.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["user", "review", userId],
    getUserReviewApi(userId as string)
  );
  await queryClient.prefetchQuery(
    ["user", "profile", userId],
    getUserByIdApi(userId as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default UserProfile;

const inputCss = css`
  width: 150px;
`;
