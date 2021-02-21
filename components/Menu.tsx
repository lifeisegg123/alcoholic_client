import { Avatar, Menu } from "antd";
import Link from "next/link";
import { User } from "types";

const MenuItem = (user: User, isLoggedIn: boolean, logout: () => {}) => (
  <Menu>
    {isLoggedIn && user ? (
      <>
        <Menu.Item>
          <Link href={`/userProfile/${user.id}`}>
            <a>
              <Avatar src={user.profileImg} />
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <a onClick={logout}>로그아웃</a>
        </Menu.Item>
      </>
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

export default MenuItem;
