const Site = require('../models/Site');
const formidable = require('formidable');
const handleUploadImage = require('../utils/handleUploadImage');

exports.getSiteInfo = async (req, res) => {
  try {
    const site = await Site.find().select('siteInfo');

    return res.status(200).send({
      success: true,
      site: site[0],
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getSiteCarousel = async (req, res) => {
  try {
    const site = await Site.find().select('carousel');

    return res.status(200).send({
      success: true,
      site: site[0],
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSiteData = async (req, res) => {
  try {
    const siteInfo = await Site.findOneAndUpdate(
      { name: 'Site' },
      { $set: { siteInfo: req.body } },
      { new: true },
    ).select('siteInfo');
    return res.status(200).send({
      success: true,
      site: siteInfo,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.updateSiteCarousel = async (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    const key = fields.key;
    let imgData;

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
      imgData = await handleUploadImage(files.image, { width: false, height: false });
    }

    try {
      if (key === '0') {
        await Site.findOneAndUpdate({ name: 'Site' }, { $set: { 'carousel.0': imgData } }, { new: true }).select(
          'carousel',
        );
      } else if (key === '1') {
        await Site.findOneAndUpdate({ name: 'Site' }, { $set: { 'carousel.1': imgData } }, { new: true }).select(
          'carousel',
        );
      } else if (key === '2') {
        await Site.findOneAndUpdate({ name: 'Site' }, { $set: { 'carousel.2': imgData } }, { new: true }).select(
          'carousel',
        );
      }
      return res.status(200).send({
        success: true,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });
};
