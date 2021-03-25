import styled from "@emotion/styled";
import { Button, Form, Input, message } from "antd";
import { getUserApi, loginWithEmailApi } from "api/user";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { desktopCss, horizontalMarginAuto } from "styles/display";
import { User } from "types";

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const loginMutate = useMutation(loginWithEmailApi);
  const queryClient = useQueryClient();
  const handleLogin = async (values: User) => {
    try {
      const {
        data: { access_token },
      } = await loginMutate.mutateAsync(values);
      localStorage.setItem("access_token", access_token);
      document.cookie = `access_token=${access_token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      queryClient.fetchQuery("user/auth");
      router.push("/");
    } catch (error) {
      console.error(error);
      message.error("오류가 발생하였습니다.");
    }
  };
  return (
    <Wrapper>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item name="email" label="이메일">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="비밀번호">
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">로그인</Button>
      </Form>
    </Wrapper>
  );
};
export default Login;

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
  } catch (error) {}
  return {
    props: {},
  };
};

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
