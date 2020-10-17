const changeAlias = require('./changeAlias');

const transformToUrlTitle = (text) => {
  const noSpecialLetterTitle = changeAlias(text);
  return noSpecialLetterTitle.toLowerCase().split(' ').join('-');
};

module.exports = transformToUrlTitle;
