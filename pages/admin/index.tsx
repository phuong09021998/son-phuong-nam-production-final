import React, { useEffect, useState } from 'react';
import privateRoute from 'components/utils/privateRoute';
import styles from './Admin.module.scss';
import Link from 'next/link';
import { connect } from 'react-redux';
import { toggleRegisterLogin } from 'redux/actions/ui';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import AdminNontification from 'components/AdminNontification';
import AdminUsers from 'components/AdminUsers';
import AdminPosts from 'components/AdminPosts';
import AdminProducts from 'components/AdminProducts';
import AdminOthers from 'components/AdminOthers';
import PersonIcon from '@material-ui/icons/Person';
import Head from 'next/head';
import { Menu, Dropdown } from 'antd';
import { logOutUser } from 'redux/actions/users';
import AdminMessages from 'components/AdminMessages';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    color: 'white!important',
    padding: '0',
    margin: '0.2em 1em',
  },
}));

interface Props {
  toggleRegisterLogin(isOpen: boolean, status: string): any;
  user: any;
  logOutUser: any;
}

function Admin({ toggleRegisterLogin, user, logOutUser }: Props) {
  const [currentActive, setCurrentActive] = useState('posts');
  const classes = useStyles();

  const handleLogOut = () => {
    logOutUser();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const userDopdown = (
    <Menu>
      <Menu.Item>
        <div className={styles.logOut} style={{ textAlign: 'center' }} onClick={handleLogOut}>
          Đăng xuất
        </div>
      </Menu.Item>
    </Menu>
  );

  // @ts-ignore
  const handleMenuClick = (e: any, currentActive: string) => {
    setCurrentActive(currentActive);
  };

  useEffect(() => {
    toggleRegisterLogin(false, 'none');
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Công Ty TNHH MTV Xây Dựng Sơn Phương Nam</title>
        <link rel="icon" href="/icons/logo.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        ></link>
        <script
          src="https://cdn.tiny.cloud/1/qgedl1ngglvk21uno0qh1ho9gipueyfoq04lyv6y6b2vm8fo/tinymce/5/tinymce.min.js"
          // @ts-ignore
          referrerpolicy="origin"
        ></script>
      </Head>
      <div className={styles.container}>
        <div className={styles.leftAdmin}>
          <Link href="/">
            <div className={styles.topMenu}>
              <div className={styles.logo}>
                <img src="/icons/logo.svg" alt="logo" />
              </div>
              <div className={styles.textWrapper}>
                <div className={styles.text}>PHƯƠNG NAM</div>
                <div className={styles.slogan}>Thách Thức Thời Gian</div>
              </div>
            </div>
          </Link>
          <hr />
          <div className={styles.mainMenu}>
            {/* <Button
              className={classes.button}
              onClick={(e) => handleMenuClick(e, 'nontification')}
              // @ts-ignore
              style={currentActive === 'nontification' ? { backgroundColor: '#00acc1' } : null}
            >
              <div className={styles.menuItem}>
                <div className={styles.icon}>
                  <img src="/icons/alarm.svg" alt="alarm" />
                </div>
                <div className={styles.text}>Thông Báo</div>
              </div>
            </Button> */}
            {/* <Button
              className={classes.button}
              onClick={(e) => handleMenuClick(e, 'messages')}
              // @ts-ignore
              style={currentActive === 'messages' ? { backgroundColor: '#00acc1' } : null}
            >
              <div className={styles.menuItem}>
                <div className={styles.icon}>
                  <img src="/icons/comment.svg" alt="comment" />
                </div>
                <div className={styles.text}>Tin Nhắn</div>
              </div>
            </Button> */}
            {user && user.role === 2 && (
              <Button
                className={classes.button}
                onClick={(e) => handleMenuClick(e, 'users')} // @ts-ignore
                style={currentActive === 'users' ? { backgroundColor: '#00acc1' } : null}
              >
                <div className={styles.menuItem}>
                  <div className={styles.icon}>
                    <img src="/icons/people.svg" alt="people" />
                  </div>
                  <div className={styles.text}>Người Dùng</div>
                </div>
              </Button>
            )}

            <Button
              className={classes.button}
              onClick={(e) => handleMenuClick(e, 'posts')} // @ts-ignore
              style={currentActive === 'posts' ? { backgroundColor: '#00acc1' } : null}
            >
              <div className={styles.menuItem}>
                <div className={styles.icon}>
                  <img src="/icons/newspaper.svg" alt="news" />
                </div>
                <div className={styles.text}>Bài Viết</div>
              </div>
            </Button>
            <Button
              className={classes.button}
              onClick={(e) => handleMenuClick(e, 'products')} // @ts-ignore
              style={currentActive === 'products' ? { backgroundColor: '#00acc1' } : null}
            >
              <div className={styles.menuItem}>
                <div className={styles.icon}>
                  <img src="/icons/product.svg" alt="product" />
                </div>
                <div className={styles.text}>Sản Phẩm</div>
              </div>
            </Button>
            <Button
              className={classes.button}
              onClick={(e) => handleMenuClick(e, 'mores')} // @ts-ignore
              style={currentActive === 'mores' ? { backgroundColor: '#00acc1' } : null}
            >
              <div className={styles.menuItem}>
                <div className={styles.icon}>
                  <img src="/icons/more.svg" alt="more" />
                </div>
                <div className={styles.text}>Khác</div>
              </div>
            </Button>
          </div>
          <div className={styles.img}></div>
        </div>
        <div className={styles.rightAdmin}>
          <div className={styles.space}></div>
          <div className={styles.rightContent}>
            <div className={styles.top}>
              <Dropdown overlay={userDopdown} placement="bottomCenter" trigger={['click']}>
                <Button>
                  <div className={styles.topItem}>
                    <PersonIcon />
                  </div>
                </Button>
              </Dropdown>
              {/* <Button>
                <div className={styles.topItem}>
                  <NotificationsIcon />
                </div>
              </Button> */}
              {/* @ts-ignore */}
              <AdminMessages />
            </div>
            <hr />
            {/* {currentActive === 'nontification' && <AdminNontification />} */}
            {currentActive === 'users' && user && user.role === 2 && <AdminUsers />}
            {currentActive === 'posts' && <AdminPosts />}
            {currentActive === 'products' && <AdminProducts />}
            {currentActive === 'mores' && <AdminOthers />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => ({ user: state.users.data });

export default privateRoute(connect(mapStateToProps, { toggleRegisterLogin, logOutUser })(Admin), true);
