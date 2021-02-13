import styled from "@emotion/styled";
import { Button, Form, Input, message } from "antd";
import { loginWithEmailApi } from "api/auth";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { desktopCss, horizontalMarginAuto } from "styles/display";
import { User } from "types";

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const loginMutate = useMutation(loginWithEmailApi);
  const handleLogin = async (values: User) => {
    try {
      await loginMutate.mutateAsync(values);
      router.push("/");
    } catch (error) {
      console.error(error);
      message.error("오류가 발생하였습니다.");
    }
  };
  return (
    <Wrapper>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item name="email" label="Email">
          <Input type="email" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">로그인</Button>
      </Form>
    </Wrapper>
  );
};
export default Login;

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
