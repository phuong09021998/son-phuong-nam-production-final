const scrollToBottom = () => {
  const textEl = document.getElementById('text');
  // @ts-ignore
  if (textEl) {
    textEl.scrollTop = textEl.scrollHeight;
  }
};

export default scrollToBottom;
