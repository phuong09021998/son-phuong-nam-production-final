const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  carousel: {
    type: Array,
    default: [],
  },
  siteInfo: {
    address: String,
    phone: String,
    zalo: String,
    facebook: String,
    gmail: String,
    info: String,
  },
});

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;
