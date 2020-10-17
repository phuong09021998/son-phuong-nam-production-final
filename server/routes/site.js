const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const checkModerator = require('../middlewares/moderator');
const { getSiteInfo, getSiteCarousel, updateSiteData, updateSiteCarousel } = require('../controllers/site');

router.get('/site/info', getSiteInfo);
router.get('/site/carousel', getSiteCarousel);
router.put('/site/info', auth, checkModerator, updateSiteData);
router.put('/site/carousel', auth, checkModerator, updateSiteCarousel);

module.exports = router;
