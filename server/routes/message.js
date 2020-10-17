const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const moderator = require('../middlewares/moderator');
const { getMessages, getLastMessagesByAdmin } = require('../controllers/message');

// User routes
router.post('/messages', auth, getMessages);
router.get('/messages/admin', auth, moderator, getLastMessagesByAdmin);

module.exports = router;
