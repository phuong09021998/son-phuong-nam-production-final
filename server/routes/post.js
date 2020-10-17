const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkModerator = require('../middlewares/moderator');
const {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getPosts,
  getPostImage,
  getPostUrls,
  getPostRange,
} = require('../controllers/post');

// User routes
router.get('/post/:postUrl', getPost);
router.get('/posts', getPosts);
router.get('/post/image/:postUrl', getPostImage);
router.get('/posturls', getPostUrls);
router.get('/postRange', getPostRange);
// Admin routes
router.post('/post', auth, checkModerator, createPost);
router.put('/post/:postId', auth, checkModerator, updatePost);
router.delete('/post/:postId', auth, checkModerator, deletePost);

module.exports = router;
