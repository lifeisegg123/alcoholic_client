import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import styled from "@emotion/styled";
import { Button, message, Modal, Select, Space, Spin } from "antd";

import { createAlcoholApi, getAlcoholsByCategoryIdApi } from "api/alcohol";
import AlcoholList from "components/alcohol/AlcoholList";
import AlcoholForm from "components/alcohol/AlcoholForm";
import { flexColCss, flexRowCss } from "styles/display";
import { serializeData } from "utils/serializeData";
import { generateFormData } from "utils/generateFormData";
import { Alcohol } from "types";

const AlcoholTabPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalButton = () => {
    setModalVisible(true);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const [sortBy, setSortBy] = useState("");
  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const router = useRouter();
  const { categoryId } = router.query;
  const { data, isSuccess, isLoading } = useInfiniteQuery(
    ["alcohol/category", categoryId],
    getAlcoholsByCategoryIdApi(categoryId as string, sortBy),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const [alcoholList, setAlcoholList] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      setAlcoholList(serializeData(data!));
    }
  }, [isLoading]);

  const createAlcoholMutation = useMutation("alcohol/create", createAlcoholApi);
  const formSubmitHandler = async (values: Alcohol) => {
    try {
      const formData = generateFormData(values);
      await createAlcoholMutation.mutateAsync(formData);
      message.success("관리자 승인후 처리될 예정입니다.");
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      message.error("오류가 발생하였습니다.");
    }
  };

  return (
    <div css={flexColCss}>
      <Modal
        width="60vw"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <AlcoholForm
          finishHandler={formSubmitHandler}
          loading={createAlcoholMutation.isLoading}
        />
      </Modal>
      <Space direction="vertical" size="large">
        <h3>category name</h3>
        <RegistWrapper>
          <p>찾는 술이 없다면</p>
          <Button type="primary" onClick={handleModalButton}>
            등록하기
          </Button>
        </RegistWrapper>
        <Select
          style={{ width: 120 }}
          defaultValue="정렬하기"
          onChange={handleSort}
        >
          <Select.Option value="price,DESC">가격낮은순</Select.Option>
          <Select.Option value="price,ASC">가격높은순</Select.Option>
          <Select.Option value="rating,ASC">별점순</Select.Option>
        </Select>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <AlcoholList alcohols={alcoholList} />
        )}
      </Space>
    </div>
  );
};

export default AlcoholTabPage;

const RegistWrapper = styled.div`
  ${flexRowCss}
  & p {
    margin-right: 3%;
  }
`;
