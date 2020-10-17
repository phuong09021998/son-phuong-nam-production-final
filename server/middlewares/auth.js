// const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const user = await User.findByToken(token);

    if (!token || !user) {
      throw new Error('User not found.');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      error: 'You are not currently login.',
    });
  }
};

module.exports = checkAuth;
