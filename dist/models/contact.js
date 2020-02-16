"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requiredText = {
  type: String,
  required: true
};
const contactSchema = new _mongoose.Schema({
  name: requiredText,
  surname: String,
  message: requiredText,
  email: {
    type: String,
    lowercase: true,
    validate: [_validator.default.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
    unique: true
  },
  phone: {
    type: Number,
    required: true,
    validate: [input => input.length !== 9, 'Incorrect Phone']
  },
  consent: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});
const contact = (0, _mongoose.model)('contact', contactSchema);
var _default = contact;
exports.default = _default;