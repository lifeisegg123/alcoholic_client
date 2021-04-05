import { QuestionOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { List, Space } from "antd";
import { getRandomList } from "api/alcohol";
import AlcoholListItem from "components/alcohol/AlcoholListItem";
import Link from "next/link";
import { useQuery } from "react-query";
import { bounce } from "styles/animations";
import { flexColCss, flexRowCss } from "styles/display";
import { Alcohol } from "types";

const IndexPage = () => {
  const { data: alcoholList, isLoading } = useQuery(
    ["alcohol", "random-list"],
    getRandomList,
    { refetchOnWindowFocus: false, staleTime: Infinity }
  );

  return (
    <Space direction="vertical" size="large" align="center">
      <h3>당신이 원하는 술을 찾아보세요.</h3>
      <Link href={`/alcoholDetail/random`}>
        <Box>
          <StylesQuestion />
          <h5>오늘의 추천술은 뭘까요?</h5>
        </Box>
      </Link>

      <StyledList
        loading={isLoading}
        dataSource={alcoholList}
        grid={{
          gutter: 16,
          xs: 2,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        renderItem={(item) => (
          <List.Item>
            <AlcoholListItem alcohol={item as Alcohol} />
          </List.Item>
        )}
      />
      <FooterBox>
        <div>
          <p>더 많은 술을 보고 싶다면,</p>
        </div>
        <div>
          <span>
            <Link href="/alcoholCategory/0">
              <a>여기</a>
            </Link>
          </span>
          <span>
            <p>를 눌러 보세요.</p>
          </span>
        </div>
      </FooterBox>
    </Space>
  );
};

export default IndexPage;

const Box = styled.div`
  ${flexColCss}
  margin-top: 10vh;
  padding: 3em;
  transform: translateY(-20%);
  transition: all 0.7s ease-in-out;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 1em;
  cursor: pointer;
  animation: ${bounce} 1500ms ease infinite;
  h5 {
    padding-top: 2rem;
  }
`;

const StylesQuestion = styled(QuestionOutlined)`
  font-size: 8em;
`;

const StyledList = styled(List)`
  margin-top: 2rem;
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  div:last-of-type {
    ${flexRowCss}
    span:first-of-type {
      a {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.2rem;
      }
    }
  }
`;
