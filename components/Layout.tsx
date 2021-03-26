import styled from "@emotion/styled";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Layout, Dropdown, Space, Input } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
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
  const [windowSize] = useWindowSize();
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
        <title>주당이선생</title>
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
          <HeaderTitle>
            <h1>주당 이선생</h1>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </HeaderTitle>
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
          {windowSize.width! > 768 ? (
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

      <ADContainer>
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit="DAN-1vVWssddsNiTgAXu"
          data-ad-width="320"
          data-ad-height="100"
        />
      </ADContainer>

      <StyledFooter>
        <span>
          <p>ⓒ 2021 주당 이선생</p>
        </span>
        <span>
          <a href="mailto:leejj2002@naver.com">문의사항: leejj2002@naver.com</a>
        </span>
        <span>
          <Link href="/개인정보처리방침.html">개인정보처리방침</Link>
        </span>
        <span>
          <Link href="/이용약관.html">이용약관</Link>
        </span>
      </StyledFooter>
    </Wrapper>
  );
};

export default AppLayout;

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ADContainer = styled.div`
  margin-bottom: 6rem;
`;
const StyledContent = styled(Content)`
  margin: 5vh auto;
  min-height: 70vh;
  width: 95%;
  padding-bottom: 6rem;
  ${desktopCss({
    width: "60%",
  })};
  ${flexColCss}
`;

const StyledFooter = styled(Footer)`
  position: absolute;
  padding: 0;
  bottom: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.black};
  span {
    margin: 0.3rem 2rem;
    p {
      color: ${({ theme }) => theme.colors.primary};
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
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

const HeaderTitle = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;
