import styled from "@emotion/styled";
import { Card, List, message } from "antd";
import { desktopCss, horizontalMarginAuto } from "styles/display";
import { Review } from "types";
import ReviewInput from "./ReviewInput";
import ReviewItem from "./ReviewItem";
import { addReviewApi, updateReviewApi } from "api/review";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "hooks/useUser";

type ReviewContainerProps = {
  reviews: Review[];
  alcoholId: string;
};

const ReviewContainer = ({ reviews, alcoholId }: ReviewContainerProps) => {
  const queryClient = useQueryClient();
  const [user, isLoggedIn] = useUser();

  const addReviewMutation = useMutation(addReviewApi);
  const submitReview = async (review: string) => {
    try {
      await addReviewMutation.mutateAsync({ desc: review, alcoholId });
      queryClient.fetchQuery(["alcohol", "detail", alcoholId]);
      message.success("리뷰가 등록되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("에러가 발생하였습니다.");
    }
  };

  const updateReviewMutation = useMutation(updateReviewApi);
  const updateReview = (id: string) => async (desc: string) => {
    try {
      await updateReviewMutation.mutateAsync({ id, desc });
      queryClient.fetchQuery(["alcohol", "detail", alcoholId]);
      message.success("리뷰가 수정되었습니다.");
    } catch (error) {
      console.error(error);
      message.error("에러가 발생하였습니다.");
    }
  };

  return (
    <Wrapper>
      <Card>
        <List
          header={`${reviews.length}개의 댓글`}
          itemLayout="horizontal"
          dataSource={reviews}
          renderItem={(item) => (
            <li>
              <ReviewItem
                userId={isLoggedIn && user.id}
                review={item}
                editHandler={updateReview}
                editLoading={updateReviewMutation.isLoading}
              />
            </li>
          )}
        />
        <ReviewInput
          isLoggedIn={isLoggedIn}
          isLoading={addReviewMutation.isLoading}
          submitHandler={submitReview}
        />
      </Card>
    </Wrapper>
  );
};

export default ReviewContainer;

const Wrapper = styled.div`
  ${horizontalMarginAuto}
  ${desktopCss({
    width: "70%",
  })}
`;
