"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    validate: [_validator.default.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: [input => input.length !== 4, 'Max Than 4 chearacters']
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'superadmin']
  }
}, {
  timestamps: true
});
const User = (0, _mongoose.model)('user', userSchema);
var _default = User;
exports.default = _default;