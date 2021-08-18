const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const Tour = require('../models/tourModel');
<<<<<<< HEAD
=======
// const catchAsync = require('../utils/catchAsync');
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/([""])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value:${value}. Please use another value `;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid inputdata.${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token , please log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('your token has expired,please log in again', 401);

const sendErrorDev = (err, req, res) => {
  console.log(req.originalUrl);

  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  return res.status(err.statusCode).render('error', {
    title: 'Something went Wrong...!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

<<<<<<< HEAD
    // .error("ERROR",err);
=======
    console.error('ERROR', err);
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
    return res.status(500).json({
      staus: 'error',
      message: 'something went very wrong!',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error('ERROR', err);
  return res.status(500).json({
    staus: 'error',
    message: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'validationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, req, res);
  }
};
