import { useState } from "react";
import { useMutation } from "react-query";

import styled from "@emotion/styled";
import {
  Button,
  Cascader,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
} from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import ImgCrop from "antd-img-crop";

import { horizontalMarginAuto } from "styles/display";
import { createAlcoholApi } from "api/alcohol";
import { generateFormData } from "utils/generateFormData";

const categoryOptions = [
  {
    value: 1000,
    label: "위스키",
    children: [
      {
        value: 1010,
        label: "싱글 몰트 위스키",
        children: [
          {
            value: 1011,
            label: "뭐시깽이",
          },
        ],
      },
    ],
  },
  {
    value: 1100,
    label: "진",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

const AlcoholForm = () => {
  const createAlcoholMutation = useMutation(createAlcoholApi);

  const [form] = Form.useForm();
  const [image, setImage] = useState<UploadFile<any>[]>();
  const handleUploadImage = (info: UploadChangeParam<UploadFile<any>>) => {
    console.log(info);
    setImage([info.file]);
    form.setFieldsValue({ thumbnail: info.file.originFileObj });
  };

  const handleSubmit = async (values: any) => {
    if (!image) return message.error("이미지를 업로드해주세요.");
    try {
      const data = {
        ...values,
        category: values.category[values.category.length - 1],
      };
      const formData = generateFormData(data);
      console.dir(formData.get("thumbnail"));
      await createAlcoholMutation.mutateAsync(formData);
    } catch (error) {
      console.log(error);
      message.error("오류가 발생하였습니다.");
    }
  };

  return (
    <StyledForm onFinish={handleSubmit} form={form}>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="제품사진"
        name="thumbnail"
      >
        <ImgCrop grid quality={1} rotate>
          <Upload
            accept="image/*"
            listType="picture-card"
            onChange={handleUploadImage}
            fileList={image}
          >
            업로드
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="제품명"
        name="name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="카테고리"
        name="category"
      >
        <Cascader expandTrigger="hover" options={categoryOptions} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="설명"
        name="desc"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="알콜도수"
        name="alcoholPercentage"
      >
        <InputNumber
          formatter={(value) => `${value}%`}
          parser={(value) => value!.replace("%", "")}
          min={0}
          max={100}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="판매처"
        name="sellingAt"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="원료"
        name="ingredient"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="추천안주"
        name="recommandedFood"
      >
        <Input />
      </Form.Item>
      <Button
        css={horizontalMarginAuto}
        size="large"
        type="primary"
        htmlType="submit"
        loading={createAlcoholMutation.isLoading}
      >
        등록
      </Button>
    </StyledForm>
  );
};

export default AlcoholForm;

const StyledForm = styled(Form)`
  margin: auto;
  .ant-form-item-label {
    width: 20%;
  }
  @media screen and (min-width: 567px) {
    width: 60%;
  }
`;
