const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkAdmin = require('../middlewares/admin');
const moderator = require('../middlewares/moderator');

const {
  readUser,
  // createUser,
  getAvatar,
  updateUser,
  loginUser,
  getAllUsers,
  getUserById,
  extractUserById,
  logoutUser,
  updateUserById,
  deleteUserById,
  createUserByAdmin,
  loginByGoogle,
  loginByFacebook,
  addToCart,
} = require('../controllers/user');

// User routes
router.get('/user', auth, readUser);
router.get('/user/avatar', auth, getAvatar);
// router.post('/user', createUser);
router.post('/user/login', loginUser);
router.post('/user/cart', auth, addToCart);
router.put('/user', auth, updateUser);
router.get('/user/logout', auth, logoutUser);
router.post('/user/login/google', loginByGoogle);
router.post('/user/login/facebook', loginByFacebook);

// Admin routes
router.get('/users', auth, checkAdmin, getAllUsers);
router.get('/user/:userId', auth, moderator, getUserById);
router.post('/admin/user', auth, checkAdmin, createUserByAdmin);
router.put('/user/:userId', auth, checkAdmin, updateUserById);
router.delete('/user/:userId', auth, checkAdmin, deleteUserById);

// Middleware
router.param('userId', extractUserById);

module.exports = router;
