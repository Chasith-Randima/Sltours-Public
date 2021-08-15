const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const pug = require("pug");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./constrollers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const viewRouter = require('./routes/viewRoutes');

// MIDDLE WARES-----------------------------------____________________________________________

//app started

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

app.use(cors());

app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from this IP,Please try again in an hour',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.json({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanatize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
//app.use("/api/v1/bookings",bookingRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //     status:"fail",
  //     message:`Can't find${req.originalUrl} on this server`
  // });

  // const err = new Error(`Can't find${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode  = 404;

  next(new AppError(`Can't find${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

//SERVER--------------------------------------__________________________________________
