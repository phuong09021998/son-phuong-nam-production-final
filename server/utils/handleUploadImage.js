const fs = require('fs');
const tinify = require('tinify');

tinify.key = process.env.TINIFY_KEY;

const handleUploadImage = async (imageFile, { width, height }) => {
  const buffer = fs.readFileSync(imageFile.path);
  let resizeBuffer;
  if (width && height) {
    resizeBuffer = await tinify.fromBuffer(buffer).resize({ method: 'fit', width, height }).toBuffer();
  } else {
    resizeBuffer = await tinify.fromBuffer(buffer).toBuffer();
  }
  return {
    data: resizeBuffer,
    contentType: imageFile.type,
  };
};

module.exports = handleUploadImage;
