import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import styled from "@emotion/styled";
import { Button, message, Modal, Select, Space } from "antd";

import { createAlcoholApi } from "api/alcohol";
import AlcoholList from "components/alcohol/AlcoholList";
import AlcoholForm from "components/alcohol/AlcoholForm";
import { flexColCss, flexRowCss } from "styles/display";
import { generateFormData } from "utils/generateFormData";
import { Alcohol } from "types";
import { getCategoryName } from "utils/getCategoryName";

const AlcoholTabPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalButton = () => {
    setModalVisible(true);
  };
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const router = useRouter();
  const { categoryId } = router.query;
  const [sortBy, setSortBy] = useState("");

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const createAlcoholMutation = useMutation("alcohol/create", createAlcoholApi);
  const formSubmitHandler = async (values: Alcohol) => {
    try {
      const formData = generateFormData(values);
      await createAlcoholMutation.mutateAsync(formData);
      message.success("관리자 승인후 처리될 예정입니다.");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error("오류가 발생하였습니다.");
    }
  };
  return (
    <Wrapper>
      {modalVisible && (
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
      )}
      <StyledSpace direction="vertical" size="large">
        <h3>{getCategoryName(categoryId as string)}</h3>
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
          <Select.Option value="price,ASC">가격낮은순</Select.Option>
          <Select.Option value="price,DESC">가격높은순</Select.Option>
          <Select.Option value="rating,DESC">별점순</Select.Option>
        </Select>

        <AlcoholList categoryId={categoryId as string} sortBy={sortBy} />
      </StyledSpace>
    </Wrapper>
  );
};

export default AlcoholTabPage;

const Wrapper = styled.div`
  ${flexColCss};
  width: 100%;
`;

const RegistWrapper = styled.div`
  ${flexRowCss}
  & p {
    margin-right: 3%;
  }
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;
