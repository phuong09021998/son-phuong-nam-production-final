const User = require('../models/User');
const formidable = require('formidable');
const handleUploadImage = require('../utils/handleUploadImage');
const bcrypt = require('bcrypt');
const Message = require('../models/Message')

// User controllers
exports.readUser = (req, res) => {
  let avatar = false;
  if (req.user.avatar.data) {
    avatar = true;
  }

  return res.status(200).send({
    success: true,
    user: {
      ...req.user._doc,
      avatar,
    },
  });
};

// exports.createUser = (req, res) => {
//   const form = formidable({ multiples: true });
//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       return res.status(400).send({
//         success: false,
//         error: err.message,
//       });
//     }

//     let user = new User(fields);

//     if (files.avatar) {
//       if (!/\.(jpe?g|png|gif|bmp)$/i.test(files.avatar.name)) {
//         return res.status(200).send({
//           success: false,
//           error: 'You must upload an image.',
//         });
//       }
//       if (files.avatar.size > 5000000) {
//         return res.status(200).send({
//           success: false,
//           error: 'Image cannot be larger than 5Mb.',
//         });
//       }
//       user.avatar = await handleUploadImage(files.avatar, { width: 250, height: 250 });
//     }

//     try {
//       if (user.role !== 0) {
//         throw new Error('You are not authorized to create a moderator.');
//       }

//       if (!user.token) {
//         user.generateToken();
//       }

//       const doc = await user.save();
//       doc.avatar = undefined;
//       doc.password = undefined;
//       return res.cookie('spn_auth', user.token).status(200).send({
//         success: true,
//         user: doc,
//       });
//     } catch (error) {
//       return res.status(400).send({
//         success: false,
//         error: error.message,
//       });
//     }
//   });
// };

exports.createUserByAdmin = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    let user = new User(fields);

    if (files.avatar) {
      if (!/\.(jpe?g|png|gif|bmp)$/i.test(files.avatar.name)) {
        return res.status(200).send({
          success: false,
          error: 'You must upload an image.',
        });
      }
      if (files.avatar.size > 1000000) {
        return res.status(200).send({
          success: false,
          error: 'Image cannot be larger than 1Mb.',
        });
      }
      user.avatar = await handleUploadImage(files.avatar, { width: 250, height: 250 });
    }

    try {
      const doc = await user.save();
      doc.avatar = undefined;
      doc.password = undefined;
      return res.status(200).send({
        success: true,
        user: doc,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  });
};

exports.getAvatar = (req, res) => {
  if (req.user.avatar.data) {
    res.set('Content-Type', req.user.avatar.contentType);
    return res.status(200).send(req.user.avatar.data);
  } else {
    return res.status(400).send({
      success: false,
      error: 'No avatar found.',
    });
  }
};

exports.updateUser = (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    let user;

    if (fields.password) {
      fields.password = await User.generateHash(fields.password);
    }

    if (files.avatar) {
      fields.avatar = {};

      if (!/\.(jpe?g|png|gif|bmp)$/i.test(files.avatar.name)) {
        return res.status(200).send({
          success: false,
          error: 'You must upload an image.',
        });
      }
      if (files.avatar.size > 5000000) {
        return res.status(200).send({
          success: false,
          error: 'Image cannot be larger than 5Mb.',
        });
      }
      fields.avatar = await handleUploadImage(files.avatar, { width: 250, height: 250 });
      user = await User.findOneAndUpdate({ _id: req.user._id }, fields, { new: true }).select('-avatar -password');
    } else {
      user = await User.findOneAndUpdate({ _id: req.user._id }, fields, { new: true }).select('-avatar -password');
    }

    return res.status(200).send({
      success: true,
      user,
    });
  });
};

exports.loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    let avatar = false;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found.');
    }

    if (user.avatar.data) {
      user.avatar = undefined;
      // user.hasAvatar = true;
      avatar = true;
    }

    if (!user.password) {
      throw new Error('Cannot use normal login.');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Password is incorrect.');
    }

    user.generateToken();
    await User.findByIdAndUpdate(user._id, { token: user.token });
    user.password = undefined;
    
    return res
      .status(200)
      .send({
        success: true,
        user: {
          ...user._doc,
          avatar,
        },
      });
  } catch (error) {
    return res.status(401).send({
      success: false,
      error: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: '' }, { new: true });
    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// Admin controllers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort([['name', 'asc']]);
    return res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  return res.status(200).send({
    success: true,
    user: req.userById,
  });
};

exports.updateUserById = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).send({
        success: false,
        error: err.message,
      });
    }

    let user;

    if (fields.password) {
      fields.password = await User.generateHash(fields.password);
    }

    if (files.avatar) {
      fields.avatar = {};

      if (!/\.(jpe?g|png|gif|bmp)$/i.test(files.avatar.name)) {
        return res.status(200).send({
          success: false,
          error: 'You must upload an image.',
        });
      }
      if (files.avatar.size > 1000000) {
        return res.status(200).send({
          success: false,
          error: 'Image cannot be larger than 1Mb.',
        });
      }

      fields.avatar = await handleUploadImage(files.avatar, { width: 250, height: 250 });
      user = await User.findOneAndUpdate({ _id: req.userById._id }, fields, { new: true }).select('-avatar -password');
    } else {
      user = await User.findOneAndUpdate({ _id: req.userById._id }, fields, { new: true }).select('-avatar -password');
    }

    return res.status(200).send({
      success: true,
      user,
    });
  });
};

exports.deleteUserById = async (req, res) => {
  try {
    if (req.userById.role <= 1) {
      await User.findByIdAndDelete(req.userById._id);
      await Message.deleteMany({ roomId: req.userById._id })
      return res.status(200).send({
        success: true,
      });
    } else {
      throw new Error('You cannot delete admin.');
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

// Middleware
exports.extractUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found.');
    }
    req.userById = user;
    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

exports.loginByGoogle = async (req, res) => {
  try {
    const doc = await User.findOneAndUpdate({ googleId: req.body.googleId }, { token: req.body.token }, { new: true });
    if (!doc) {
      const user = new User(req.body);
      const createDoc = await user.save();
      return res.cookie('spn_auth', createDoc.token).status(200).send({
        success: true,
        user: createDoc,
      });
    }
    return res.cookie('spn_auth', doc.token).status(200).send({
      success: true,
      user: doc,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        error: 'Email is already in use.',
      });
    }
    return res.status(400).send({
      success: false,
      error: 'User not found.',
    });
  }
};

exports.loginByFacebook = async (req, res) => {
  try {
    const doc = await User.findOneAndUpdate(
      { facebookId: req.body.facebookId },
      { token: req.body.token },
      { new: true },
    );
    if (!doc) {
      const user = new User(req.body);
      const createDoc = await user.save();
      return res.cookie('spn_auth', createDoc.token).status(200).send({
        success: true,
        user: createDoc,
      });
    }
    return res.cookie('spn_auth', doc.token).status(200).send({
      success: true,
      user: doc,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        error: 'Email is already in use.',
      });
    }
    return res.status(400).send({
      success: false,
      error: 'User not found.',
    });
  }
};

exports.addToCart = async (req, res) => {
  const items = req.body;

  try {
    const doc = await User.findByIdAndUpdate(req.user._id, { $push: { cart: items } }, { new: true });

    return res.send({
      success: true,
      cart: doc.cart,
    });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};
