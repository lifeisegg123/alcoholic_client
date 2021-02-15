import { useEffect, useState } from "react";
import { useMutation } from "react-query";

import styled from "@emotion/styled";
import {
  Button,
  TreeSelect,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
  Image,
} from "antd";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import ImgCrop from "antd-img-crop";

import { horizontalMarginAuto } from "styles/display";
import { createAlcoholApi } from "api/alcohol";
import { generateFormData } from "utils/generateFormData";
import { Alcohol } from "types";
import { backUrl } from "configs/environment";

const categoryOptions = [
  {
    value: 1100,
    label: "위스키",
    children: [
      {
        value: 1110,
        label: "싱글 몰트 위스키",
      },
    ],
  },
  {
    value: 1200,
    label: "럼",
    children: [],
  },
];

type AlcoholForm = {
  defaultValues?: Alcohol;
  finishHandler?: (
    values?: Alcohol,
    defaultValues?: Alcohol
  ) => Promise<any> | void;
};

const AlcoholForm = ({ defaultValues, finishHandler }: AlcoholForm) => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<UploadFile<any>[]>();
  useEffect(() => {
    if (defaultValues) {
      console.log("Form's defualt", defaultValues);
      form.setFieldsValue(defaultValues);
    }
  }, []);

  const handleUploadImage = (info: UploadChangeParam<UploadFile<any>>) => {
    console.log("info", info);
    setImage([info.file]);
    form.setFieldsValue({ thumbnail: info.file.originFileObj });
  };

  const createAlcoholMutation = useMutation(createAlcoholApi);
  const handleSubmit = async (values: any) => {
    if (!defaultValues && !image)
      return message.error("이미지를 업로드해주세요.");
    try {
      if (finishHandler) {
        return finishHandler(values, defaultValues);
      }
      const formData = generateFormData(values);
      console.dir(formData.get("thumbnail"));
      await createAlcoholMutation.mutateAsync(formData);
      message.success("등록이 완료되었습니다.");
    } catch (error) {
      console.log(error);
      message.error("오류가 발생하였습니다.");
    }
  };

  return (
    <StyledForm onFinish={handleSubmit} form={form}>
      {defaultValues && <Image src={`${backUrl}/${defaultValues.thumbnail}`} />}
      <Form.Item
        rules={[{ required: true, message: "항목을 입력해주세요." }]}
        label="제품사진"
        name="thumbnail"
      >
        <ImgCrop grid quality={1} rotate zoom={false}>
          <Upload
            accept="image/*"
            listType="picture-card"
            onChange={handleUploadImage}
            fileList={image}
          >
            이미지 업로드
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
        <TreeSelect treeDefaultExpandAll treeData={categoryOptions} />
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
        label="가격"
        name="price"
      >
        <InputNumber
          formatter={(value) => `${value}₩`}
          parser={(value) => value!.replace("₩", "")}
          min={0}
        />
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
        {defaultValues ? "수정 및 확인" : "등록"}
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
