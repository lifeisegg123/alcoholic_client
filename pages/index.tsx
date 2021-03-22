import { QuestionOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Space } from "antd";
import { GetStaticProps } from "next";
import Link from "next/link";
import { bounce } from "styles/animations";

const IndexPage = () => {
  return (
    <Space direction="vertical" size="large" align="center">
      <h3>당신이 원하는 술을 찾아보세요.</h3>
      <Link href={`/alcoholDetail/random`}>
        <Box>
          <StylesQuestion />
        </Box>
      </Link>
    </Space>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default IndexPage;

const Box = styled.div`
  margin-top: 20vh;
  padding: 5em;
  transform: translateY(-20%);
  transition: all 0.7s ease-in-out;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 1em;
  cursor: pointer;
  animation: ${bounce} 1500ms ease infinite;
`;

const StylesQuestion = styled(QuestionOutlined)`
  font-size: 8em;
`;
