import styled from "@emotion/styled";
import { Button, Cascader, Form, Input, InputNumber, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { horizontalMarginAuto } from "styles/display";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

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
  const [form] = Form.useForm();
  const handleSubmit = (value: unknown) => {
    console.log(value);
  };
  const [image, setImage] = useState<UploadFile<any>[]>();
  const handleUploadImage = (info: UploadChangeParam<UploadFile<any>>) => {
    console.log(info);
    setImage([info.file]);
  };
  return (
    <StyledForm onFinish={handleSubmit} form={form}>
      <Form.Item label="제품사진" name="thumbnail">
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
      <Form.Item label="제품명" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="카테고리" name="category">
        <Cascader options={categoryOptions} />
      </Form.Item>
      <Form.Item label="설명" name="desc">
        <Input />
      </Form.Item>
      <Form.Item label="알콜도수" name="alcoholPercentage">
        <InputNumber
          formatter={(value) => `${value}%`}
          parser={(value) => value!.replace("%", "")}
          min={0}
          max={100}
        />
      </Form.Item>
      <Form.Item label="판매처" name="sellingAt">
        <Input />
      </Form.Item>
      <Form.Item label="원료" name="ingredient">
        <Input />
      </Form.Item>
      <Form.Item label="추천안주" name="recommandedFood">
        <Input />
      </Form.Item>
      <Button
        css={horizontalMarginAuto}
        size="large"
        type="primary"
        htmlType="submit"
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
