import React, { Fragment, useEffect } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { Collapse } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
import { toggleRegisterLogin } from '../../redux/actions/ui';
import { getUser, logOutUser } from 'redux/actions/users';
import { Avatar, Menu, Dropdown } from 'antd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const { Panel } = Collapse;
import { useRouter } from 'next/router'

interface Props {
  toggleRegisterLogin(isOpen: boolean, status: string): void;
  user: any;
  getUser: any;
  logOutUser: any;
}

function Header({ toggleRegisterLogin, user, getUser, logOutUser }: Props) {
  const isSmallDevice: boolean = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumLargeDevice: boolean = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const router = useRouter()

  const handleOpenLogin = (): void => {
    toggleRegisterLogin(true, 'login');
  };

  const handleLinkClick = (link: string) => {
    router.push(link);
  }

  // const handleOpenRegister = (): void => {
  //   toggleRegisterLogin(true, 'register');
  // };

  const handleLogOut = () => {
    logOutUser();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const renderTopMenu = () => (
    <div className={styles.topMenu}>
      <div className={styles.text}>MENU</div>
      <div className={styles.icon}>
        <img src="/icons/menu.svg" alt="menu-icon" />
      </div>
    </div>
  );

  const renderAvatar = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <div className={styles.logOut} style={{ textAlign: 'center' }} onClick={handleLogOut}>
            Đăng xuất
          </div>
        </Menu.Item>
      </Menu>
    );

    const setAvatar = () => {
      if (user.avatar) {
        return <Avatar src="/api/user/avatar" />;
      } else if (user.thirdPartyAvatar) {
        return <Avatar src={user.thirdPartyAvatar} />;
      } else if (!user.avatar) {
        return <Avatar className={styles.avatarName}>{user.name[0]}</Avatar>;
      }
    };
    
   

    return (
      <div className={styles.avatarWrapper}>
        <div className={styles.avatar}>{setAvatar()}</div>
        <div className={styles.down}>
          <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
            <ExpandMoreIcon />
          </Dropdown>
        </div>
      </div>
    );
  };

  const renderMediumLargeDeviceLayout = () => (
    <header className={styles.header}>
      {/* <h1>large</h1> */}
      <Link href="/">
        <div className={styles.logo}>
          <div className={styles.logoWrapper}>
            <img src="/icons/logo.svg" alt="logo" />
          </div>
          <div className={styles.text}>
            <div className={styles.name}>PHƯƠNG NAM</div>
            <div className={styles.slogan}>Thách Thức Thời Gian</div>
          </div>
        </div>
      </Link>
      <div className={styles.menuWrapper}>
        {/* <Link href="/"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/')}>Trang Chủ</div>
        {/* </Link>  */}
        {/* <Link href="/cua-hang"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/cua-hang')}>Cửa Hàng</div>
        {/* </Link> */}
        {/* <Link href="/dich-vu"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/dich-vu')}>Dịch Vụ</div>
        {/* </Link> */}
        {/* <Link href="/du-an"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/du-an')}>Dự Án</div>
        {/* </Link> */}
        {/* <Link href="/kien-thuc"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/kien-thuc')}>Kiến Thức</div>
        {/* </Link> */}
        {/* <Link href="/gioi-thieu"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/gioi-thieu')}>Giới Thiệu</div>
        {/* </Link> */}
        {/* <Link href="/lien-he"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/lien-he')}>Liên Hệ</div>
        {/* </Link> */}
      </div>
      <div className={styles.right}>
        {/* <div className={styles.cart}>
          <img src="/icons/shopping-cart.svg" alt="cart" />
        </div> */}
        {user ? (
          renderAvatar()
        ) : (
          <header className={styles.loginRegister}>
            <div className={styles.login} onClick={handleOpenLogin}>
              <div className={styles.icon}>
                <img src="/icons/login.svg" alt="login"/>
              </div>
              <div className={styles.text}>ĐĂNG NHẬP</div>
            </div>
            {/* <div className={styles.register} onClick={handleOpenRegister}>
              hoặc <span>đăng ký</span>
            </div> */}
          </header>
        )}
      </div>
    </header>
  );

  const renderSmallDeviceLayout = () => (
    <header className={styles.header}>
      <div className={styles.top}>
        <Link href="/">
          <div className={styles.logo}>
            <div className={styles.logoWrapper}>
              <img src="/icons/logo.svg" alt="logo" />
            </div>
            <div className={styles.text}>
              <div className={styles.name}>PHƯƠNG NAM</div>
              <div className={styles.slogan}>Thách Thức Thời Gian</div>
            </div>
          </div>
        </Link>
        <div className={styles.right}>
          {/* <div className={styles.cart}>
            <img src="/icons/shopping-cart.svg" alt="cart" />
          </div> */}
          {user ? (
            renderAvatar()
          ) : (
            <div className={styles.loginRegister}>
              <div className={styles.login} onClick={handleOpenLogin}>
                <div className={styles.icon}>
                  <img src="/icons/login.svg" alt="login"/>
                </div>
                <div className={styles.text}>ĐĂNG NHẬP</div>
              </div>
              {/* <div className={styles.register} onClick={handleOpenRegister}>
                hoặc <span>đăng ký</span>
              </div> */}
            </div>
          )}
        </div>
      </div>
      <div className={styles.menuWrapper}>
        <Collapse className={styles.menu} style={{ padding: '0' }}>
          <Panel header={renderTopMenu()} key="1" showArrow={false} style={{ padding: '0' }}>
               {/* <Link href="/"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/')}>Trang Chủ</div>
        {/* </Link>  */}
        {/* <Link href="/cua-hang"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/cua-hang')}>Cửa Hàng</div>
        {/* </Link> */}
        {/* <Link href="/dich-vu"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/dich-vu')}>Dịch Vụ</div>
        {/* </Link> */}
        {/* <Link href="/du-an"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/du-an')}>Dự Án</div>
        {/* </Link> */}
        {/* <Link href="/kien-thuc"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/kien-thuc')}>Kiến Thức</div>
        {/* </Link> */}
        {/* <Link href="/gioi-thieu"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/gioi-thieu')}>Giới Thiệu</div>
        {/* </Link> */}
        {/* <Link href="/lien-he"> */}
          <div className={styles.menuItem} onClick={() => handleLinkClick('/lien-he')}>Liên Hệ</div>
        {/* </Link> */}
          </Panel>
        </Collapse>
      </div>
    </header>
  );

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Fragment>
      {isSmallDevice && renderSmallDeviceLayout()}
      {isMediumLargeDevice && renderMediumLargeDeviceLayout()}
    </Fragment>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.users.data,
});

export default connect(mapStateToProps, { toggleRegisterLogin, getUser, logOutUser })(Header);
