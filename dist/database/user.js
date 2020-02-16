"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _consola = require("consola");

const {
  DATABASE_URL_USER
} = process.env;

const dbConnect = async (req, res, next) => {
  try {
    const db = await (0, _mongoose.connect)(DATABASE_URL_USER, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    (0, _consola.success)({
      message: "DB Connected ".concat(db.connection.host, " port:").concat(db.connection.port, " name:").concat(db.connection.name)
    });
    next();
  } catch (err) {
    (0, _consola.fatal)({
      message: err
    });
  }
};

var _default = dbConnect;
exports.default = _default;