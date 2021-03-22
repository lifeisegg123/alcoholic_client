import styled from "@emotion/styled";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Layout, Dropdown, Space, Input } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import { desktopCss, flexColCss } from "styles/display";
import { useQueryClient } from "react-query";
/* import { logoutApi } from "api/user"; */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import MenuItem from "./Menu";
import { useUser } from "hooks/useUser";
import axios from "axios";
import { useWindowSize } from "hooks/useWindowSize";

const { Header, Content, Footer } = Layout;

type Props = {
  children?: ReactNode;
  title?: string;
};

const AppLayout = ({ children }: Props) => {
  const { width } = useWindowSize();
  const router = useRouter();
  const [user, isLoggedIn] = useUser();
  const queryClient = useQueryClient();
  const logout = async () => {
    localStorage.removeItem("access_token");
    document.cookie = `access_token=`;
    axios.defaults.headers.common["Authorization"] = null;
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
    <Wrapper>
      <Head>
        <title>주당 이선생</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <StyledHeader>
        <Link href="/">
          <a>
            <h1>주당 이선생</h1>
          </a>
        </Link>
        <Space size="large" align="center">
          {showSearchBar && (
            <Input.Search
              ref={searchRef}
              css={searchCss}
              onSearch={handleSearch}
              onBlur={handleSearchBlur}
            />
          )}
          {width! > 768 ? (
            MenuItem(
              user,
              isLoggedIn,
              logout,
              true,
              !showSearchBar && (
                <SearchOutlined onClick={handleSearchIconClick} css={iconCss} />
              )
            )
          ) : (
            <>
              {!showSearchBar && (
                <SearchOutlined onClick={handleSearchIconClick} css={iconCss} />
              )}
              <Dropdown overlay={MenuItem(user, isLoggedIn, logout)}>
                <MenuOutlined css={iconCss} />
              </Dropdown>
            </>
          )}
        </Space>
      </StyledHeader>

      <StyledContent>{children}</StyledContent>

      <StyledFooter>
        <span>I'm here to stay (Footer)</span>
      </StyledFooter>
    </Wrapper>
  );
};

export default AppLayout;

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  padding: 0 4vw;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  & h1 {
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${(props) => props.theme.fontSize.title};
  }
`;

const StyledContent = styled(Content)`
  margin: 5vh auto;
  min-height: 70vh;
  width: 90%;
  padding-bottom: 6rem;
  ${desktopCss({
    width: "60%",
  })};
  ${flexColCss}
`;

const StyledFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
`;
const iconCss = css`
  font-size: 20px;
`;

const searchCss = css`
  display: flex;
  margin-bottom: 5px;
  width: 40vw;
  ${desktopCss({ width: "20vw" })}
`;
