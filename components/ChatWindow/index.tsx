import React, { useEffect, useState } from 'react';
// import { toggleChatBubble } from 'redux/actions/ui';
import { Avatar } from 'antd';
import styles from './ChatWindow.module.scss';
import { UserOutlined } from '@ant-design/icons';
// import Button from '@material-ui/core/Button';
import UserAvatar from 'components/UserAvatar';
import _ from 'lodash';
import moment from 'moment';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import InputEmoji from 'components/EmojiInput';
import { loginByGoogle, loginByFacebook } from 'redux/actions/users';
import { connect } from 'react-redux';
import { message } from 'antd'

function ChatWindow({
  messages,
  // handleOpenLogin,
  handleSendMessage,
  handleCloseChat,
  user,
  isAdmin,
  isOnline,
  roomInfo,
  handleClick,
  loginByGoogle,
  loginByGoogleError,
  // loginUserError;
  loginByFacebookError,
  loginByFacebook
}: any) {
  const [text, setText] = useState('')
  // @ts-ignore
  let lastSeenIndex: number;
  if (isAdmin && messages.length) {
    if (messages[messages.length - 1].sender === 'Admin') {
      // @ts-ignore
      lastSeenIndex = _.findLastIndex(messages, (message) => message.seen && message.sender === 'Admin');
    }
  } else if (!isAdmin && messages.length) {
    if (messages[messages.length - 1].sender !== 'Admin') {
      // @ts-ignore
      lastSeenIndex = _.findLastIndex(messages, (message) => message.seen && message.sender !== 'Admin');
    }
  }

  const renderTime = (i: number) => {
    if (i !== 0) {
      if (messages[i].createdAt - messages[i - 1].createdAt > 120000) {
        return (
          <div className={styles.time}>{moment(messages[i].createdAt).locale('vi').startOf('minute').fromNow()}</div>
        );
      }
    } else {
      return (
        <div className={styles.time}>{moment(messages[i].createdAt).locale('vi').startOf('minute').fromNow()}</div>
      );
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

  const renderChatMessages = () =>
    messages.map((item: any, i: number) => {
      if (item.type === 'text') {
        if (isAdmin) {
          return item.sender === 'Admin' ? (
            <div key={i}>
              {renderTime(i)}
              <div className={styles.normalText}>{item.message}</div>
              {lastSeenIndex === i && <div className={styles.seen}> ✓ Đã xem</div>}
            </div>
          ) : (
              <div key={i}>
                {renderTime(i)}
                <div className={styles.senderText}>{item.message}</div>
              </div>
            );
        } else {
          return item.sender === 'Admin' ? (
            <div key={i}>
              {renderTime(i)}
              <div className={styles.senderText}>{item.message}</div>
            </div>
          ) : (
              <div key={i}>
                {renderTime(i)}
                <div className={styles.normalText}>{item.message}</div>
                {lastSeenIndex === i && <div className={styles.seen}> ✓ Đã xem</div>}
              </div>
            );
        }
      }
    });
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
  return (
    <div className={styles.chatWrapper} onClick={handleClick}>
      <div className={styles.top}>
        <div className={styles.admin}>
          <div className={styles.leftAdmin}>
            {typeof roomInfo === 'boolean' ? (
              <div className={styles.avatar}>
                <Avatar
                  style={{
                    backgroundColor: '#e91e63',
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}
                  icon={<UserOutlined />}
                />
              </div>
            ) : (
                // @ts-ignore
                <UserAvatar userId={roomInfo.roomId} />
              )}

            <div className={styles.dot}></div>
          </div>
          <div className={styles.rightAdmin}>
            {typeof roomInfo === 'boolean' ? (
              <div className={styles.name}>Admin</div>
            ) : (
                <div className={styles.name}>{roomInfo.roomName}</div>
              )}
            {isOnline ? (
              <div className={styles.status}>online</div>
            ) : (
                <div className={styles.statusOffline}>offline</div>
              )}
          </div>
        </div>
        <div className={styles.close} onClick={handleCloseChat}>
          <img src="/icons/close-2.svg" alt="close" />
        </div>
      </div>
      {user ? (
        <>
          {' '}
          <div className={styles.middle} id="text">
            {messages && renderChatMessages()}
          </div>
          <div className={styles.bottom}>
            <div className={styles.inputWrapper}>
              <div className={styles.input}>
                {/* @ts-ignore */}
                <InputEmoji cleanOnEnter onEnter={(value) => {handleSendMessage(value); setText('')}} placeholder="Nhập tin nhắn" value={text} onChange={value => setText(value)}/>
              </div>
              <div className={styles.send} onClick={() => {handleSendMessage(text); setText('')}}>
                <img src="/icons/send.svg" alt="send" />
              </div>
            </div>
          </div>
        </>
      ) : (
          <div className={styles.requireLogin}>
            Bạn phải đăng nhập để chat!
            <br />
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
        )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  loginByGoogleError: state.users.loginByGoogleError,
  loginByFacebookError: state.users.loginByFacebookError,
  user: state.users.data,
});

export default connect(mapStateToProps, { loginByGoogle, loginByFacebook })(ChatWindow)
