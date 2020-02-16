"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.notFound = void 0;

const notFound = (req, res, next) => {
  const error = new Error("Not Found - ".concat(req.originalUrl));
  res.status(404);
  next(error);
};

exports.notFound = notFound;

const errorHandler = (error, req, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.name === 'MongoError' ? error.errmsg : error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  });
};

exports.errorHandler = errorHandler;