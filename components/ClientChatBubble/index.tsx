import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatBubble.module.scss';
import { connect } from 'react-redux';
import { toggleChatBubble } from 'redux/actions/ui';
import { toggleRegisterLogin } from 'redux/actions/ui';
import ChatWindow from '../ChatWindow';
// @ts-ignore
import io from 'socket.io-client';
import scrollToBottom from 'components/utils/scrollBottom';
import { message } from 'antd';
import axios from 'config/axios';
import baseUrl from 'config/basedUrl';
// import localstorage from 'local-storage';
// // @ts-ignore
// const token = localstorage.get('spn_auth')
// const header = {
//   headers: {
//     'Authorization': 'Bearer ' + token
//   }
// }

function ChatBubble({ openChatBubble, toggleChatBubble, user, toggleRegisterLogin }: any) {
  const [messages, setMessages] = useState([]);
  const [isOnline, setOnline] = useState(false);
  const socketRef = useRef();

  const handleOpenChat = () => {
    toggleChatBubble(true);
    if (user) {
      // @ts-ignore
      socketRef.current.emit('Set seen', { user: 'Admin', roomId: user._id });
    }
  };

  const handleCloseChat = () => {
    toggleChatBubble(false);
  };

  const handleOpenLogin = () => {
    toggleRegisterLogin(true, 'login');
  };

  const handleSendMessage = (text: any) => {
    if (text) {
      // @ts-ignore
      socketRef.current.emit('Chat Message', {
        data: {
          roomId: user._id,
          message: text,
          sender: user.name,
          type: 'text',
          createdAt: Date.now(),
          roomName: user.name,
        },
        roomId: user._id,
      });
      // @ts-ignore
    }
  };

  useEffect(() => {
    socketRef.current = io(baseUrl);

    if (user) {
      localStorage.setItem('spn_auth', user.token);
      // @ts-ignore
      socketRef.current.emit('Login', { userId: user._id });
      // @ts-ignore
      socketRef.current.emit('Join room', { roomId: user._id });

      try {
        // setTimeout(() => {
        axios.post('/messages', { roomId: user._id }, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((res) => {
          if (res.data.messages.length) {
            setMessages(res.data.messages);
            // console.log(res.data.messages);
          } else {
            // @ts-ignore
            socketRef.current.emit('Initialize Chat', { roomId: user._id, roomName: user.name });
          }
        });
        // }, 1000)

      } catch (error) {
        message.error(error.response.error);
      }

      // @ts-ignore
      socketRef.current.on('Chat Message', (msg: any) => {
        // @ts-ignore
        setMessages((oldMessages) => [...oldMessages, msg]);
      });
      // @ts-ignore
      socketRef.current.on('Chat Error', (err: any) => {
        message.error(err.response);
      });

      // @ts-ignore
      socketRef.current.on('Active Users', (data) => {
        const dataArr = Object.values(data);
        if (dataArr.includes('Admin')) {
          setOnline(true);
        } else {
          setOnline(false);
        }
      });
      // @ts-ignore
      socketRef.current.on('Set Seen', () => {
        axios.post('/messages', { roomId: user._id }, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((res) => {
          setMessages(res.data.messages);
        });
      });
    } else {
      toggleChatBubble(false);
    }
  }, [user]);

  const handleSetSeen = () => {
    if (user) {
      // @ts-ignore
      socketRef.current.emit('Set seen', { user: 'Admin', roomId: user._id });
    }
  };

  useEffect(() => {
    if (openChatBubble) {
      scrollToBottom();
    }
  }, [messages, openChatBubble]);

  return (
    <React.Fragment>
      {openChatBubble ? (
        <ChatWindow
          user={user}
          handleOpenLogin={handleOpenLogin}
          handleSendMessage={handleSendMessage}
          handleCloseChat={handleCloseChat}
          messages={messages}
          isOnline={isOnline}
          roomInfo={true}
          handleClick={handleSetSeen}
        />
      ) : (
          <div className={styles.icon} onClick={handleOpenChat}>
            <img src="/icons/chat.svg" alt="chat" />
          </div>
        )}
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => ({
  openChatBubble: state.ui.openChatBubble,
  user: state.users.data,
});

export default connect(mapStateToProps, { toggleChatBubble, toggleRegisterLogin })(ChatBubble);
