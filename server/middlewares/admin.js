const checkAdmin = (req, res, next) => {
  if (req.user.role === 2) {
    next();
  } else {
    return res.status(401).send({
      success: false,
      error: 'You are not authorized to do this action.',
    });
  }
};

module.exports = checkAdmin;
