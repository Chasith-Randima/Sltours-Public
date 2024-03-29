const crypto = require('crypto');
const { promisify } = require('util');
<<<<<<< HEAD
const catchAsync = require('./../utils/catchAsync');
=======
// const catchAsync = require('./../utils/catchAsync');
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
<<<<<<< HEAD
// const factory = require('./handlerFactory');
=======
const factory = require('./handlerFactory');
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

<<<<<<< HEAD
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   //secure:true,
  //   httpOnly: true,
  //   secure:req.secure || req.headers['x-forwarded-proto'] === 'https'
  // };

  // if (req.secure || req.headers['x-forwarded-proto'] === 'https')
  //   cookieOptions.secure = true;

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure:true,
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });
=======
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure:true,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

<<<<<<< HEAD
exports.signup = catchAsync(async (req, res, next) => {
=======
exports.signup = async (req, res, next) => {
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  // const url = `${req.protocol}://${req.get("host")}/me`;
  // console.log(url);
  // await new Email(newUser,url).sendWelcome();

<<<<<<< HEAD
  createSendToken(newUser, 201, req, res);
=======
  createSendToken(newUser, 201, res);
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

  // const token = signToken(newUser._id);

  // res.status(201).json({
  //     status:"success",
  //     token,
  //     data:{
  //         user:newUser
  //     }
  // })
<<<<<<< HEAD
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('please enter valid email or password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  createSendToken(user, 200, req, res);

  // const token = signToken(user._id);

  // res.status(200).json({
  //     status:"success",
  //     token
  // })
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

=======
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('please enter valid email or password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  createSendToken(user, 200, res);

  // const token = signToken(user._id);

  // res.status(200).json({
  //     status:"success",
  //     token
  // })
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
  if (!token) {
    next(new AppError('Your not loged in,Please log in to get access', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('the user belonging to this token does no longer exist', 401)
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password again!please log in', 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
<<<<<<< HEAD
});
=======
};
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // if(!token){
      //     next(new AppError("Your not loged in,Please log in to get access",401));
      // }

      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('you do not have permission to perform this action.', 403)
      );
    }

    next();
  };
};

<<<<<<< HEAD
exports.forgotPassword = catchAsync(async (req, res, next) => {
=======
exports.forgotPassword = async (req, res, next) => {
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with that email'));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  // const message = `forgot password?submit a new patch request with your new password and password confirm to
  // :${resetURL}.\n if you didn't forget your email please ignore this message`;

  try {
    // await sendEmail({
    //     email:user.email,
    //     subject:"your password reset token",
    //     message
    // });

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
<<<<<<< HEAD

    // console.log(err);

    return next(
      new AppError('there was an error sendin email please try again later'),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, req, res);

  // const token = signToken(user._id);

  // res.status(200).json({
  //     status:"success",
  //     token
  // });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');



  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('your current password is wrong', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, req, res);
});
=======

    console.log(err);

    return next(
      new AppError('there was an error sendin email please try again later'),
      500
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);

  // const token = signToken(user._id);

  // res.status(200).json({
  //     status:"success",
  //     token
  // });
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //console.log(req.user.correctPassword,user.password);

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('your current password is wrong', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
};

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// const crypto = require('crypto');
// const { promisify } = require('util');
// const catchAsync = require('./../utils/catchAsync');
// const User = require('./../models/userModel');
// const jwt = require('jsonwebtoken');
// const AppError = require('./../utils/appError');
// const Email = require('./../utils/email');
// const factory = require('./handlerFactory');

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);

//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     //secure:true,
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

//   res.cookie('jwt', token, cookieOptions);

//   user.password = undefined;

//   res.status(statusCode).json({
//     status: 'success',
//     token,
//     data: {
//       user,
//     },
//   });
// };

// exports.signup = catchAsync(async (req, res, next) => {
//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//     passwordChangedAt: req.body.passwordChangedAt,
//     role: req.body.role,
//   });

//   // const url = `${req.protocol}://${req.get("host")}/me`;
//   // console.log(url);
//   // await new Email(newUser,url).sendWelcome();

//   createSendToken(newUser, 201, res);

//   // const token = signToken(newUser._id);

//   // res.status(201).json({
//   //     status:"success",
//   //     token,
//   //     data:{
//   //         user:newUser
//   //     }
//   // })
// });

// exports.login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new AppError('please enter valid email or password', 400));
//   }

//   const user = await User.findOne({ email }).select('+password');

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError('incorrect email or password', 401));
//   }

//   createSendToken(user, 200, res);

//   // const token = signToken(user._id);

//   // res.status(200).json({
//   //     status:"success",
//   //     token
//   // })
// });

// exports.logout = catchAsync((req, res) => {
//   res.cookie('jwt', 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });

//   res.status(200).json({ status: 'success' });
// });

// exports.protect = catchAsync(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     next(new AppError('Your not loged in,Please log in to get access', 401));
//   }

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const currentUser = await User.findById(decoded.id);

//   if (!currentUser) {
//     return next(
//       new AppError('the user belonging to this token does no longer exist', 401)
//     );
//   }

//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError('User recently changed password again!please log in', 401)
//     );
//   }

//   req.user = currentUser;
//   res.locals.user = currentUser;
//   next();
// });

// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       // if(!token){
//       //     next(new AppError("Your not loged in,Please log in to get access",401));
//       // }

//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );

//       const currentUser = await User.findById(decoded.id);

//       if (!currentUser) {
//         return next();
//       }

//       if (currentUser.changedPasswordAfter(decoded.iat)) {
//         return next();
//       }
//       res.locals.user = currentUser;
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }

//   next();
// };

// exports.restrictTo = catchAsync((...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('you do not have permission to perform this action', 403)
//       );
//     }

//     next();
//   };
// });

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new AppError('There is no user with that email'));
//   }

//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });

//   const resetURL = `${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/users/resetPassword/${resetToken}`;

//   // const message = `forgot password?submit a new patch request with your new password and password confirm to
//   // :${resetURL}.\n if you didn't forget your email please ignore this message`;

//   try {
//     // await sendEmail({
//     //     email:user.email,
//     //     subject:"your password reset token",
//     //     message
//     // });

//     const resetURL = `${req.protocol}://${req.get(
//       'host'
//     )}/api/v1/users/resetPassword/${resetToken}`;

//     await new Email(user, resetURL).sendPasswordReset();

//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to email',
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });

//     console.log(err);

//     return next(
//       new AppError('there was an error sendin email please try again later'),
//       500
//     );
//   }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   const hashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next(new AppError('Token is invalid or has expired', 400));
//   }

//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();

//   createSendToken(user, 200, res);

//   // const token = signToken(user._id);

//   // res.status(200).json({
//   //     status:"success",
//   //     token
//   // });
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select('+password');

//   //console.log(req.user.correctPassword,user.password);

//   if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
//     return next(new AppError('your current password is wrong', 401));
//   }

//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();

//   createSendToken(user, 200, res);
// });
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
