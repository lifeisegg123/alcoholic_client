import styled from "@emotion/styled";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Layout, Dropdown, Space, Input } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import { desktopCss } from "styles/display";
import { useQueryClient } from "react-query";
import { logoutApi } from "api/user";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import MenuItem from "./Menu";
import { useUser } from "hooks/useUser";

const { Header, Content, Footer } = Layout;

type Props = {
  children?: ReactNode;
  title?: string;
};

const AppLayout = ({ children }: Props) => {
  const router = useRouter();
  const [user, isLoggedIn] = useUser();
  const queryClient = useQueryClient();
  const logout = async () => {
    await logoutApi();
    queryClient.setQueryData("user/auth", null);
    queryClient.resetQueries(["user/auth"]);
  };
  const searchRef = useRef<Input>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const handleSearchIconClick = () => {
    setShowSearchBar(true);
  };
  const handleSearchBlur = () => {
    setShowSearchBar(false);
  };
  useEffect(() => {
    if (showSearchBar) {
      searchRef.current?.focus();
    }
  }, [showSearchBar]);
  const handleSearch = (value: string) => {
    if (!value) return;
    router.push(`/search?q=${value}`);
  };
  return (
    <>
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
        <Space size="large" align="center">
          {showSearchBar ? (
            <Input.Search
              ref={searchRef}
              css={searchCss}
              onSearch={handleSearch}
              onBlur={handleSearchBlur}
            />
          ) : (
            <SearchOutlined onClick={handleSearchIconClick} css={iconCss} />
          )}
          <Dropdown overlay={MenuItem(user, isLoggedIn, logout)}>
            <MenuOutlined css={iconCss} />
          </Dropdown>
        </Space>
      </StyledHeader>

      <StyledContent>{children}</StyledContent>

      <Footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </Footer>
    </>
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
const iconCss = css`
  font-size: 20px;
`;

const searchCss = css`
  display: flex;
  margin-bottom: 5px;
`;
