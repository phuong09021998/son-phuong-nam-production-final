const Post = require('../models/Post');
const transformToUrlTitle = require('../utils/transformToUrlTitle');
const changeAlias = require('../utils/changeAlias');
const { clearHash } = require('../services/redis');
const handleUploadImage = require('../utils/handleUploadImage');
const formidable = require('formidable');
const fs = require('fs');

exports.createPost = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    let post = new Post(fields);

    if (files.image) {
      if (!/\.(jpe?g|png|gif|bmp|svg)$/i.test(files.image.name)) {
        return res.status(400).send({
          success: false,
          error: 'You must upload an image.',
        });
      }
      if (files.image.size > 5000000) {
        return res.status(200).send({
          success: false,
          error: 'Image cannot be larger than 5Mb.',
        });
      }
      if (/\.(jpe?g|png|gif|bmp)$/i.test(files.image.name)) {
        post.image = await handleUploadImage(files.image, { width: 700, height: 525 });
      } else {
        post.image.data = fs.readFileSync(files.image.path);
        post.image.contentType = files.image.type;
      }
    }

    post.urlTitle = transformToUrlTitle(fields.title) + '-' + Date.now();
    post.simplifiedTitle = changeAlias(fields.title);
    post.postBy = req.user.name;
    try {
      const doc = await post.save();
      doc.image = undefined;
      clearHash('posts');
      return res.status(200).send({
        success: true,
        post: doc,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });
};

exports.updatePost = async (req, res) => {
  const postId = req.params.postId;

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    if (files.image) {
      if (!/\.(jpe?g|png|gif|bmp)$/i.test(files.image.name)) {
        return res.status(200).send({
          success: false,
          error: 'You must upload an image.',
        });
      }
      if (files.image.size > 5000000) {
        return res.status(200).send({
          success: false,
          error: 'Image cannot be larger than 5Mb.',
        });
      }
      // fields.image = await handleUploadImage(files.image, { width: 700, height: 525 });
      if (/\.(jpe?g|png|gif|bmp)$/i.test(files.image.name)) {
        fields.image = await handleUploadImage(files.image, { width: 700, height: 525 });
      } else {
        // console.log(files.image);
        fields.image.data = fs.readFileSync(files.image.path);
        fields.image.contentType = files.image.type;
      }
    }

    if (fields.title) {
      fields.urlTitle = transformToUrlTitle(fields.title) + '-' + Date.now();
      fields.simplifiedTitle = changeAlias(fields.title);
    }

    try {
      const doc = await Post.findByIdAndUpdate(postId, fields, { new: true });
      doc.image = undefined;
      clearHash('posts');
      return res.status(200).send({
        success: true,
        post: doc,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });
};

exports.getPost = async (req, res) => {
  const postUrl = req.params.postUrl;

  try {
    const post = await Post.findOne({ urlTitle: postUrl }).select('-image').cache();
    if (!post) {
      throw new Error('No post found.');
    }
    return res.status(200).send({
      success: true,
      post,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let type = req.query.type ? req.query.type : null;
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip);
  let posts;

  try {
    if (type) {
      posts = await Post.find({ type, publish: true })
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .select('-image -content')
        .cache();
    } else {
      posts = await Post.find()
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .select('-image')
        .cache();
    }

    return res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    await Post.findByIdAndDelete(postId);
    clearHash('posts');

    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getPostImage = async (req, res) => {
  const postUrl = req.params.postUrl;

  try {
    const postImg = await Post.findOne({ urlTitle: postUrl }).select('image');

    if (!postImg) {
      throw new Error('No post found.');
    }
    res.set('Content-Type', postImg.image.contentType);
    return res.status(200).send(postImg.image.data);
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getPostUrls = async (req, res) => {
  const type = req.query.type;

  try {
    const urls = await Post.find({ publish: true, type }).select('urlTitle');
    const paths = urls.map((url) => ({ params: { id: url.urlTitle } }));

    if (!paths) {
      throw new Error('No urls found.');
    }

    return res.status(200).send({
      success: true,
      paths,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getPostRange = async (req, res) => {
  const type = req.query.type;

  const posts = await Post.find({ type });
  const range = posts.length;
  return res.status(200).send({
    success: true,
    range,
  });
};
