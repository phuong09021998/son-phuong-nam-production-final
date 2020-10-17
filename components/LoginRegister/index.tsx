import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import { toggleRegisterLogin } from 'redux/actions/ui';
import Login from './Login';
import styles from './LoginRegister.module.scss';

interface Props {
  registerLogin: {
    isOpen: boolean;
    status: string;
  };
  toggleRegisterLogin(isOpen: boolean, status: string): void;
}

function LoginRegister({ registerLogin, toggleRegisterLogin }: Props) {
  const onClose = () => {
    toggleRegisterLogin(false, 'none');
  };

  return (
    <Drawer placement="right" closable={false} onClose={onClose} visible={registerLogin.isOpen} width={320}>
      <div className={styles.drawer}>
        {registerLogin.status === 'login' && <Login close={onClose} />}
        {/* {registerLogin.status === 'register' && <div>I'm a register</div>} */}
      </div>
    </Drawer>
  );
}

const mapStateToProps = (state: any) => ({ registerLogin: state.ui.registerLogin, user: state.users.data });

export default connect(mapStateToProps, { toggleRegisterLogin })(LoginRegister);
