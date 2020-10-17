const express = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware
express.use(cookieParser());
express.use(bodyParser.json());
express.use(morgan('dev'));
express.use(cors());

// Import routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const productRoutes = require('./routes/product');
const siteRoutes = require('./routes/site');
const messageRoutes = require('./routes/message');

// Routes middlewares
express.use('/api', userRoutes);
express.use('/api', postRoutes);
express.use('/api', productRoutes);
express.use('/api', siteRoutes);
express.use('/api', messageRoutes);

const server = require('http').Server(express);

module.exports = {
  express,
  server,
};
