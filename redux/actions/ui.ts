export const Types = {
  TOGGLE_REGISTER_LOGIN: 'ui/toggle-register-login',
  TOGGLE_CHAT_BUBBLE: 'ui/toggle-chat-bubble',
};

export const toggleRegisterLogin = (isOpen: boolean, status: string) => ({
  type: Types.TOGGLE_REGISTER_LOGIN,
  payload: {
    isOpen,
    status,
  },
});

export const toggleChatBubble = (isOpen: boolean) => ({
  type: Types.TOGGLE_CHAT_BUBBLE,
  payload: {
    isOpen,
  },
});
