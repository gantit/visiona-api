"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("../models/contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateEmail = async email => {
  const user = await _contact.default.findOne({
    email
  });
  return !user;
};

const contactCreate = async (req, res, next) => {
  const {
    name,
    surname,
    email,
    phone,
    message,
    consent
  } = req.body;

  try {
    const emailNotRegistered = await validateEmail(email);

    if (!emailNotRegistered) {
      res.status(400).json({
        message: 'Email is already registered.',
        success: false
      });
    }

    const newContact = new _contact.default({
      name,
      surname,
      email,
      phone,
      message,
      consent
    });
    const contactResponse = await newContact.save();
    res.status(201).json({
      message: 'Hurry! now you are successfully registred. Please nor login.',
      success: true,
      contactResponse
    });
  } catch (error) {
    next(error);
  }
};

var _default = contactCreate;
exports.default = _default;