import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Modal, Select, Space, Spin } from "antd";

import AlcoholList from "components/alcohol/AlcoholList";
import { flexColCss, flexRowCss } from "styles/display";
import AlcoholForm from "components/alcohol/AlcoholForm";
import { useInfiniteQuery } from "react-query";
import { getAlcoholsByCategoryIdApi } from "api/alcohol";
import { useRouter } from "next/router";
import { serializeData } from "utils/serializeData";

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

  const onFormSuccess = () => {
    setModalVisible(false);
  };

  return (
    <div css={flexColCss}>
      <Modal
        width="60vw"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <AlcoholForm finishHandler={onFormSuccess} />
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
