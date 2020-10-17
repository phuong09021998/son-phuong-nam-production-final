const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    trim: true,
  },
  roomId: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
  },
  type: String,
  imageData: {
    contentType: String,
    data: Buffer,
  },
  createdAt: Number,
  seen: {
    type: Boolean,
    default: false,
  },
  roomName: String,
});

module.exports = mongoose.model('Message', messageSchema);
