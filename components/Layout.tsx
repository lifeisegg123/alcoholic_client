import { css } from "@emotion/react";
import { ReactNode } from "react";
import { Layout, Menu, Dropdown, Input } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";

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
    </Head>
    <Header css={headerCss}>
      <Link href="/">
        <a>
          <h1>주당 이선생</h1>
        </a>
      </Link>
      <Dropdown overlay={menu} css={iconCss}>
        <MenuOutlined />
      </Dropdown>
    </Header>

    <Content css={contentCss}>{children}</Content>

    <Footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </Footer>
  </div>
);

export default AppLayout;

const headerCss = css`
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
  }
  border-bottom: 1px solid black;
`;

const iconCss = css`
  font-size: 20px;
`;

const contentCss = css`
  padding: 0 50px;
  margin-top: 80px;
`;
