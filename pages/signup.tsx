import { useState } from "react";
import styled from "@emotion/styled";
import { Alert, Button, Form, Input, message } from "antd";
import { css } from "@emotion/react";
import { desktopCss, horizontalMarginAuto } from "styles/display";
import { useMutation } from "react-query";
import { checkEmailApi, getUserApi, signupApi } from "api/auth";
import { User } from "types";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";

const Signup = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [isEmailExist, setIsEmailExist] = useState(false);
  const emailCheckMutate = useMutation(checkEmailApi);
  const checkEmail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    try {
      const { data } = await emailCheckMutate.mutateAsync(value);
      if (data.isUsed) {
        setIsEmailExist(true);
      } else {
        setIsEmailExist(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const passwordMatch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;
    let password;
    if (name === "password") {
      password = form.getFieldValue("passwordConfirm");
      console.log(password);
      if (!password) return;
    } else {
      password = form.getFieldValue("password");
    }
    if (value !== password) {
      setIsPasswordMatched(false);
    } else {
      setIsPasswordMatched(true);
    }
  };

  const signupMutate = useMutation(signupApi);
  const handleRegister = async ({ email, password, nickname }: User) => {
    if (isEmailExist) {
      message.error("이메일을 변경해주세요.");
    }
    if (!isPasswordMatched) {
      message.error("비밀번호를 확인해주세요.");
    }
    try {
      const res = await signupMutate.mutateAsync({ email, password, nickname });
      console.log(res);
      router.push("/login");
    } catch (error) {
      console.error(error);
      message.error("오류가 발생하였습니다.");
    }
  };

  return (
    <Wrapper>
      <Form form={form} onFinish={handleRegister}>
        <Form.Item name="email" label="이메일">
          <Input type="email" onChange={checkEmail} />
        </Form.Item>
        {isEmailExist && (
          <Alert css={alertCss} message="중복된 이메일입니다." type="error" />
        )}
        <Form.Item name="password" label="비밀번호">
          <Input.Password onChange={passwordMatch} name="password" />
        </Form.Item>
        <Form.Item name="passwordConfirm" label="비밀번호 확인">
          <Input.Password onChange={passwordMatch} name="passwordConfirm" />
        </Form.Item>
        {!isPasswordMatched && (
          <Alert
            css={alertCss}
            message="비밀번호가 일치하지 않습니다."
            type="error"
          />
        )}
        <Form.Item name="nickname" label="닉네임">
          <Input />
        </Form.Item>
        <Button loading={signupMutate.isLoading} htmlType="submit">
          회원가입
        </Button>
      </Form>
    </Wrapper>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (ctx.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
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
  } catch (error) {}
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

const alertCss = css`
  ${horizontalMarginAuto}
  width: 50%;
  margin-bottom: 24px;
`;
