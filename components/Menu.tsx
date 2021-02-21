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
              <Avatar>{user.nickname[0]}</Avatar>
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
          <Link href="/alcoholCategory/1100">
            <a>스카치 위스키</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/1200">
            <a>아이리쉬 위스키</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/1300">
            <a>아메리칸 위스키</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/1400">
            <a>케네디안 위스키</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/1500">
            <a>기타</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="brandy" title="브랜디">
        <Menu.Item>
          <Link href="/alcoholCategory/2000">
            <a>전체</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/2100">
            <a>브랜디</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/2200">
            <a>꼬냑</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/2300">
            <a>아르마냑</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="wine" title="와인">
        <Menu.Item>
          <Link href="/alcoholCategory/3000">
            <a>전체</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/3100">
            <a>레드와인</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/3200">
            <a>화이트와인</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="etc" title="기타 양주">
        <Menu.Item>
          <Link href="/alcoholCategory/4000">
            <a>전체</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/4100">
            <a>진</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/4200">
            <a>럼</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/4300">
            <a>보드카</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/4400">
            <a>리큐르</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="tradition" title="전통주">
        <Menu.Item>
          <Link href="/alcoholCategory/5000">
            <a>전체</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/5100">
            <a>탁주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/5200">
            <a>청주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/5300">
            <a>약주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/5400">
            <a>과실주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/5500">
            <a>소주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/5600">
            <a>증류주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/5700">
            <a>리큐르</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="NEAsia" title="중국 & 일본">
        <Menu.Item>
          <Link href="/alcoholCategory/6000">
            <a>전체</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/6100">
            <a>중국 | 홍주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/6200">
            <a>중국 | 백주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/6300">
            <a>중국 | 황주</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/6400">
            <a>일본 | 니혼슈</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/6500">
            <a>일본 | 일본소주</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="beer" title="맥주">
        <Menu.Item>
          <Link href="/alcoholCategory/7000">
            <a>전체</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/7100">
            <a>에일</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/7200">
            <a>라거</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/alcoholCategory/7200">
            <a>람빅</a>
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu.SubMenu>
  </Menu>
);

export default MenuItem;
