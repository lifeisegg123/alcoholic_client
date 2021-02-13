import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import { desktopCss } from "styles/display";
import { useQuery } from "react-query";
import { getUserApi } from "api/auth";
import { User } from "types";

const { Header, Content, Footer } = Layout;

const menu = (user: User, isLoggedIn: boolean) => (
  <Menu>
    {isLoggedIn ? (
      <Menu.Item>
        <Link href={`/userProfile/${user.id}`}>
          <a>
            <Avatar src={user.profileImg} />
          </a>
        </Link>
      </Menu.Item>
    ) : (
      <>
        <Menu.Item>
          <Link href="/login">
            <a>로그인</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </>
    )}

    <Menu.SubMenu key="alcohol" title="당신이 찾는 술">
      <Menu.Item>
        <Link href="/alcoholCategory/0">
          <a>전체</a>
        </Link>
      </Menu.Item>
      <Menu.SubMenu key="whiskey" title="위스키">
        <Menu.Item>
          <Link href="/alcoholCategory/1000">
            <a>전체</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/1000">
            <a>싱글몰트</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/1000">
            <a>그레인</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu.SubMenu>
  </Menu>
);

type Props = {
  children?: ReactNode;
  title?: string;
};

const AppLayout = ({ children }: Props) => {
  const { data, isSuccess: isLoggedIn } = useQuery("auth/user", getUserApi, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  console.log("userData", data);
  return (
    <div>
      <Head>
        <title>주당 이선생</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css"
        />
      </Head>
      <StyledHeader>
        <Link href="/">
          <a>
            <h1>주당 이선생</h1>
          </a>
        </Link>
        <Dropdown overlay={menu(data?.data, isLoggedIn)}>
          <StyledMenuIcon />
        </Dropdown>
      </StyledHeader>

      <StyledContent>{children}</StyledContent>

      <Footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </Footer>
    </div>
  );
};

export default AppLayout;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
  background-color: white;
  & h1 {
    white-space: nowrap;
    color: #c36827;
    font-size: ${(props) => props.theme.fontSize.title};
  }
  border-bottom: 1px solid black;
`;

const StyledMenuIcon = styled(MenuOutlined)`
  font-size: 20px;
`;

const StyledContent = styled(Content)`
  padding: 50px 0;
  margin: 0 auto;
  margin-top: 50px;
  min-height: 80vh;
  width: 90%;
  ${desktopCss({
    width: "70%",
  })};
`;
