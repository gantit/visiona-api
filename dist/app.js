"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _middlewares = require("./utils/middlewares");

var _cors = require("./utils/cors");

var _user = _interopRequireDefault(require("./database/user"));

var _user2 = _interopRequireDefault(require("./routes/user"));

var _contact = _interopRequireDefault(require("./routes/contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import Routes
const app = (0, _express.default)(); // middlewares

app.use((0, _morgan.default)('common'));
app.use(_cors.corsWithOptions);
app.use((0, _express.json)()); // routers

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});
app.use('/api/user', _user.default, _user2.default);
app.use('/api/contacts', _user.default, _contact.default);
app.use(_middlewares.notFound);
app.use(_middlewares.errorHandler);
var _default = app;
exports.default = _default;