"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsWithOptions = exports.cors = void 0;

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const whitelist = ['http://localhost:3000', 'https://visiona.cat', 'https://www.visiona.cat'];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true
    };
  } else {
    corsOptions = {
      origin: false
    };
  }

  callback(null, corsOptions);
};

const corsWithOptions = (0, _cors.default)(corsOptionsDelegate);
exports.corsWithOptions = corsWithOptions;
const cors = (0, _cors.default)();
exports.cors = cors;