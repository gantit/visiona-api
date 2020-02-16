"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _rateLimitMongo = _interopRequireDefault(require("rate-limit-mongo"));

var _contact = _interopRequireDefault(require("../controllers/contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  DATABASE_URL_USER
} = process.env;
const router = (0, _express.Router)();
const limiter = new _expressRateLimit.default({
  store: new _rateLimitMongo.default({
    uri: DATABASE_URL_USER,
    expireTimeMs: 60 * 20
  }),
  max: 3,
  windowMs: 60 * 20
}); // /api/contacts

router.post('/', limiter, _contact.default);
var _default = router;
exports.default = _default;