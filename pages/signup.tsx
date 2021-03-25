import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { desktopCss, horizontalMarginAuto } from "styles/display";
import { useMutation } from "react-query";
import { checkEmailApi, getUserApi, signupApi } from "api/user";
import { User } from "types";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";

const validateMessages = {
  required: "'${name}'은 필수 입력 항목입니다.",
};

const Signup = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const emailCheckMutate = useMutation(checkEmailApi);
  const checkEmail = async (value: string) => {
    try {
      const { data } = await emailCheckMutate.mutateAsync(value);
      if (data) {
        throw new Error("사용중인 이메일입니다.");
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const [passwordRegex, setPasswordRegex] = useState<RegExp | undefined>(
    undefined
  );
  const generatePasswordRegex = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = event;
    const regex = new RegExp(value);
    setPasswordRegex(regex);
  };

  const signupMutate = useMutation(signupApi);
  const handleRegister = async ({ email, password, nickname }: User) => {
    try {
      await signupMutate.mutateAsync({ email, password, nickname });
      router.push("/login");
    } catch (error) {
      console.error(error);
      message.error("오류가 발생하였습니다.");
    }
  };

  return (
    <Wrapper>
      <Form
        validateMessages={validateMessages}
        form={form}
        onFinish={handleRegister}
      >
        <Form.Item
          validateTrigger="onBlur"
          rules={[
            { required: true },
            {
              validator: (_, value) => {
                if (value) {
                  return checkEmail(value);
                }
                return Promise.reject();
              },
            },
          ]}
          name="email"
          label="이메일"
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true },
            { min: 6, message: "6 ~ 20자 사이로 입력해주세요." },
            { max: 20, message: "6 ~ 20자 사이로 입력해주세요." },
          ]}
          name="password"
          label="비밀번호"
        >
          <Input.Password onChange={generatePasswordRegex} name="password" />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true },
            {
              pattern: passwordRegex,
              message: "비밀번호가 일치하지 않습니다.",
            },
          ]}
          name="passwordConfirm"
          label="비밀번호 확인"
        >
          <Input.Password name="passwordConfirm" />
        </Form.Item>
        <Form.Item name="nickname" label="닉네임">
          <Input />
        </Form.Item>
        <Button loading={signupMutate.isLoading} htmlType="submit">
          아래 약관에 동의하며 회원가입
        </Button>
      </Form>
      <PolicyContainer>
        <span>
          <Link href="/개인정보처리방침.html">개인정보처리방침</Link>
        </span>
        <span>
          <Link href="/이용약관.html">이용약관</Link>
        </span>
      </PolicyContainer>
    </Wrapper>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : "";
  axios.defaults.headers.common["Authorization"] = "";
  if (ctx.req && cookie) {
    const cookieList = cookie.split(";");
    const cookieMap = cookieList.reduce((acc, v) => {
      const splited = v.split("=");
      acc[splited[0]] = splited[1];
      return acc;
    }, {} as any);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookieMap["access_token"]}`;
  }

  try {
    const res = await getUserApi();
    if (res) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error(error.response, "eerrr");
  }
  return {
    props: {},
  };
};

export default Signup;

const Wrapper = styled.div`
  ${horizontalMarginAuto}
  margin-top: 10vh;
  text-align: center;
  .ant-form-item-label {
    width: 20%;
  }
  .ant-form-item-control {
    width: 50%;
  }
  width: 90%;
  ${desktopCss({ width: "60%" })}
`;

const PolicyContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  span {
    width: 50%;
  }
`;
