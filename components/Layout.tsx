import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import { desktopCss } from "styles/display";

const { Header, Content, Footer } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>a danger item</Menu.Item>
  </Menu>
);

type Props = {
  children?: ReactNode;
  title?: string;
};

const AppLayout = ({ children }: Props) => (
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
      <Dropdown overlay={menu}>
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
  margin-top: 80px;
  width: 90%;
  ${desktopCss({
    width: "70%",
  })};
`;
