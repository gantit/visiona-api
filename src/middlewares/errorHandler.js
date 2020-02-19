const errorHandler = (error, req, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: error.name === 'MongoError' ? error.errmsg : error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

export default errorHandler;
