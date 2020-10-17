const transformToUrlTitle = require('../utils/transformToUrlTitle');
const changeAlias = require('../utils/changeAlias');
const { clearHash } = require('../services/redis');
const Product = require('../models/Product');
const formidable = require('formidable');
const handleUploadImage = require('../utils/handleUploadImage');

exports.createProduct = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    let product = new Product(fields);

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
      product.image = await handleUploadImage(files.image, { width: 800, height: 600 });
    }

    product.urlTitle = transformToUrlTitle(fields.name) + '-' + Date.now();
    product.simplifiedName = changeAlias(fields.name);

    try {
      const doc = await product.save();
      doc.image = undefined;
      clearHash('products');
      return res.status(200).send({
        success: true,
        product: doc,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });
};

exports.getProduct = async (req, res) => {
  const productUrl = req.params.productUrl;

  try {
    const product = await Product.findOne({ urlTitle: productUrl }).select('-image').cache();

    if (!product) {
      throw new Error('No product found.');
    }
    return res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getProductImage = async (req, res) => {
  const productUrl = req.params.productUrl;

  try {
    const doc = await Product.findOne({ urlTitle: productUrl });
    if (!doc) {
      throw new Error('Cannot find product.');
    }

    res.set('Content-Type', doc.image.contentType);
    return res.status(200).send(doc.image.data);
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    let product = new Product(fields);

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
      product.image = await handleUploadImage(files.image, { width: 800, height: 600 });
    }

    if (fields.name) {
      fields.urlTitle = transformToUrlTitle(fields.name) + '-' + Date.now();
      fields.simplifiedName = changeAlias(fields.name);
    }

    try {
      const doc = await Product.findByIdAndUpdate(productId, fields, { new: true });
      doc.image = undefined;
      clearHash('products');
      return res.status(200).send({
        success: true,
        product: doc,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    await Product.findByIdAndDelete(productId);
    clearHash('products');

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

exports.getProducts = async (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let skip = parseInt(req.query.skip);

  try {
    const products = await Product.find()
      .select('-image')
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .cache();

    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getProductUrls = async (req, res) => {
  try {
    const urls = await Product.find({ publish: true }).select('urlTitle');
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

exports.getProductRange = async (req, res) => {
  const products = await Product.find();
  const range = products.length;
  return res.status(200).send({
    success: true,
    range,
  });
};
