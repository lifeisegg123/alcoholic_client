import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import { Avatar, Button, List, message, Modal } from "antd";
import { useMutation, useQuery } from "react-query";

import { getUserApi } from "api/user";
import {
  deleteAlcoholApi,
  getNotConfirmedListApi,
  updateAndConfirmAlcoholApi,
} from "api/admin";
import { Alcohol } from "types";
import AlcoholForm from "components/alcohol/AlcoholForm";
import styled from "@emotion/styled";
import { generateFormData } from "utils/generateFormData";
import { css } from "@emotion/react";

const admin = ({}) => {
  const { data, refetch } = useQuery(
    "admin/alcoholList",
    getNotConfirmedListApi
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalValue, setModalValue] = useState<Alcohol | null>(null);
  const handleModalVisable = (alcoholItem: Alcohol) => () => {
    setModalVisible(true);
    setModalValue(alcoholItem);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
    setModalValue(null);
  };

  const deleteMutation = useMutation(deleteAlcoholApi);
  const handleDelete = (alcoholId: string) => async () => {
    try {
      await deleteMutation.mutateAsync(alcoholId);
      await refetch();
      message.success("삭제가 정상적으로 처리되었습니다.");
    } catch (error) {
      message.error("에러가 발생하였습니다.");
      console.error(error);
    }
  };

  const confirmMutation = useMutation(updateAndConfirmAlcoholApi);
  //FIXME: any 해결
  const handleFormSubmit = async (values: any, defaultValues: any) => {
    const { id } = defaultValues;
    const changes = Object.keys(values).reduce((acc: any, v) => {
      if (values[v] !== defaultValues[v]) {
        acc[v] = values[v];
      }
      return acc;
    }, {});
    try {
      const formData = generateFormData(changes);
      await confirmMutation.mutateAsync({ id, body: formData });
      setModalVisible(false);
      setModalValue(null);
      message.success("요청이 완료되었습니다.");
      await refetch();
    } catch (error) {
      message.error("에러가 발생하였습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        width="60vw"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <AlcoholForm
          defaultValues={modalValue!}
          finishHandler={handleFormSubmit}
          loading={confirmMutation.isLoading}
        />
      </Modal>
      <List
        css={listCss}
        dataSource={data}
        renderItem={(item: Alcohol) => (
          <ItemWrapper>
            <span onClick={handleModalVisable(item)}>
              <List.Item.Meta
                avatar={<Avatar src={item.thumbnail} />}
                title={item.name}
                description={item.desc}
              />
            </span>
            <Button type="primary" onClick={handleDelete(item.id!)}>
              삭제
            </Button>
          </ItemWrapper>
        )}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : "";
  axios.defaults.headers.common["Authorization"] = "";
  if (ctx.req && cookie) {
    const [_, token] = cookie.split("=");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await getUserApi();
    if (!res.isAdmin) {
      throw new Error("관리자가 아닙니다.");
    }
  } catch (error) {
    console.error(error.message);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default admin;

const listCss = css`
  width: 100%;
`;

const ItemWrapper = styled(List.Item)`
  margin: ${({ theme }) => theme.spacing.normal};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  > span {
    width: 100%;
  }
  transition: all 0.7s ease-in-out;
  :hover {
    transform: translateY(-20%);
    transition: all 0.7s ease-in-out;
  }
`;
