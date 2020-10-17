const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    simplifiedName: {
      type: String,
    },
    urlTitle: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
    },
    discription: {
      type: String,
      require: true,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    publish: {
      type: Boolean,
      default: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
