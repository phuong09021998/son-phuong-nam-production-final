import React, { useState, useEffect } from 'react';
import { update, generateData, isFormValid } from '../../utils/formAction';
import FormField from '../../FormField';
import styles from './Login.module.scss';
import Button from '@material-ui/core/Button';
import { loginUser, loginByGoogle, loginByFacebook } from 'redux/actions/users';
import { connect } from 'react-redux';
// import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';
import { message } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { toggleRegisterLogin } from 'redux/actions/ui';

interface Props {
  loginUser(data: DataSubmit): any;
  user: any;
  close(): void;
  loginByGoogle: any;
  loginByGoogleError: any;
  loginUserError: any;
  loginByFacebookError: any;
  loginByFacebook: any;
  toggleRegisterLogin: any;
}

interface DataSubmit {
  email: string;
  password: string;
}

function Login({
  user,
  loginUser,
  close,
  loginByGoogle,
  loginByGoogleError,
  loginUserError,
  loginByFacebookError,
  loginByFacebook,
  toggleRegisterLogin
}: Props) {
  // const router = useRouter();
  const [form, setForm] = useState({
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Mật khẩu',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  });

  const [waiting, setWaiting] = useState(false);

  const userIcon = () => <img src="/icons/user.svg" alt="user" />;
  const passwordIcon = () => <img src="/icons/password.svg" alt="password" />;

  const updateForm = (element: any) => {
    const newFormdata: any = update(element, form.formdata, 'login');

    setForm({
      ...form,
      formError: false,
      formdata: newFormdata,
    });
  };

  const submitForm = (e: any): void => {
    e.preventDefault();

    const dataToSubmit = generateData(form.formdata, 'login');
    const formIsValid = isFormValid(form.formdata, 'login');
    // console.log(form.formdata);
    if (formIsValid) {
      loginUser(dataToSubmit);
      setWaiting(true);
    } else {
      setForm({
        ...form,
        formError: true,
      });
    }
  };

  const responseGoogle = (data: any) => {
    // console.log(data)
    loginByGoogle({
      token: data.tokenId,
      name: data.profileObj.name,
      thirdPartyAvatar: data.profileObj.imageUrl,
      email: data.profileObj.email,
      googleId: data.googleId,
    });
  };

  const responseFacebook = (data: any) => {
    // console.log(data);
    loginByFacebook({
      token: data.accessToken,
      name: data.name,
      email: data.email,
      facebookId: data.id,
      thirdPartyAvatar: data.picture.data.url,
    });
  };

  const handlePress = (event: any) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      //13 is the enter keycode
      //Do stuff in here
      submitForm(event);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('spn_auth', user.token)
      if (user.role > 0) {
        // document.cookie = `spn_auth=${user.token}`

        toggleRegisterLogin(false, 'none');
      } else {
        close();
      }
    }
  }, [user]);

  useEffect(() => {
    if (loginByGoogleError) {
      message.error(loginByGoogleError);
    }
  }, [loginByGoogleError]);

  useEffect(() => {
    if (loginByFacebookError) {
      message.error(loginByFacebookError);
    }
  }, [loginByFacebookError]);

  useEffect(() => {
    if (loginUserError) {
      setWaiting(false);
      if (loginUserError.includes('Sai mật khẩu')) {
        setForm({
          ...form,
          formdata: {
            ...form.formdata,
            password: {
              ...form.formdata.password,
              valid: false,
              validationMessage: 'Sai mật khẩu',
            },
          },
        });
      } else if (loginUserError.includes('Không tìm thấy người dùng')) {
        setForm({
          ...form,
          formdata: {
            ...form.formdata,
            email: {
              ...form.formdata.email,
              valid: false,
              validationMessage: 'Không tìm thấy người dùng',
            },
          },
        });
      } else if (loginUserError.includes('Không thể đăng nhập bằng cách này')) {
        message.error('Email này không thể đăng nhập bằng cách này');
      } else {
        message.error(loginUserError);
      }
    }
  }, [loginUserError]);

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.title}>ĐĂNG NHẬP</div>
      <form onSubmit={(event) => submitForm(event)}>
        <FormField
          id={'email'}
          formdata={form.formdata.email}
          change={(e: any) => updateForm(e)}
          Prefix={userIcon}
          press={(e: any) => handlePress(e)}
        />
        <FormField
          id={'password'}
          formdata={form.formdata.password}
          change={(e: any) => updateForm(e)}
          Prefix={passwordIcon}
          press={(e: any) => handlePress(e)}
        />
        {form.formError && <div className={styles.errorLabel}>Kiểm tra lại thông tin</div>}
        {waiting && (
          <div className={styles.waiting}>
            <CircularProgress className={styles.waitingIcon} />
          </div>
        )}
        <Button
          onClick={(event) => submitForm(event)}
          style={{ backgroundColor: '#e91e63' }}
          className={styles.button}
          size="large"
          type="submit"
        >
          Xác nhận
        </Button>
      </form>
      <div className={styles.thirdAuthen}>
        <GoogleLogin
          clientId="374918945235-8gdpha6da5h9sqva4mgi53ldreces79b.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className={styles.item} onClick={renderProps.onClick}>
              <div className={styles.icon}>
                <img src="/icons/google.svg" alt="google" />
              </div>
              <div className={styles.text}>Đăng nhập bằng Google</div>
            </div>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="659986671317584"
          // autoLoad
          fields="name,email,picture,id"
          callback={responseFacebook}
          render={(renderProps: any) => (
            <div className={styles.item} onClick={renderProps.onClick}>
              <div className={styles.icon}>
                <img src="/icons/facebook.svg" alt="facebook" />
              </div>
              <div className={styles.text}>Đăng nhập bằng Facebook</div>
            </div>
          )}
        />
      </div>
      <div className={styles.close} onClick={close}>
        <img src="/icons/close.svg" alt="close" />
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.users.data,
  loginByGoogleError: state.users.loginByGoogleError,
  loginByFacebookError: state.users.loginByFacebookError,
  loginUserError: state.users.loginUserError,
});

export default connect(mapStateToProps, { loginUser, toggleRegisterLogin, loginByGoogle, loginByFacebook })(Login);
