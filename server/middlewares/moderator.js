const checkModerator = (req, res, next) => {
  if (req.user.role > 0) {
    next();
  } else {
    return res.status(401).send({
      success: false,
      error: 'You are not authorized to do this action.',
    });
  }
};

module.exports = checkModerator;
