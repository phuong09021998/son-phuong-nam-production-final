const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    simplifiedTitle: {
      type: String,
    },
    urlTitle: {
      type: String,
      required: true,
      unique: true,
    },
    postBy: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    urlTitle: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
    },
    type: {
      type: String,
      enum: ['service', 'project', 'info'],
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Middlewares

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
