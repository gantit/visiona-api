"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCreate = exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateUsername = async username => {
  const user = await _user.default.findOne({
    username
  });
  return !user;
};

const validateEmail = async email => {
  const user = await _user.default.findOne({
    email
  });
  return !user;
};

const userCreate = async (req, res, next) => {
  const {
    username,
    email,
    password,
    role
  } = req.body;

  try {
    const usernameNotTaken = await validateUsername(username);

    if (!usernameNotTaken) {
      return res.status(400).json({
        message: 'Username is already taken.',
        success: false
      });
    } // validate the email


    const emailNotRegistered = await validateEmail(email);

    if (!emailNotRegistered) {
      return res.status(400).json({
        message: 'Email is already registered.',
        success: false
      });
    } // Get the hashed password


    const pass = await _bcryptjs.default.hash(password, 12);
    const newUser = new _user.default({
      username,
      email,
      role: role || 'user',
      password: pass
    });
    const userResponse = await newUser.save();
    return res.status(201).json({
      message: 'Hurry! now you are successfully registred. Please nor login.',
      success: true,
      userResponse
    });
  } catch (error) {
    next(error);
  }

  return null;
};

exports.userCreate = userCreate;
var _default = userCreate;
exports.default = _default;