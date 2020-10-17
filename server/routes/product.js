const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkModerator = require('../middlewares/moderator');
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductImage,
  getProductUrls,
  getProductRange,
} = require('../controllers/product');

// User routes
router.get('/product/:productUrl', getProduct);
router.get('/products', getProducts);
router.get('/producturls', getProductUrls);
router.get('/product/image/:productUrl', getProductImage);
router.get('/productrange', getProductRange);
// Admin routes
router.post('/product', auth, checkModerator, createProduct);
router.put('/product/:productId', auth, checkModerator, updateProduct);
router.delete('/product/:productId', auth, checkModerator, deleteProduct);

module.exports = router;
