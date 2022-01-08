const User = require('./../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
// const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,"public/img/users");
//     },
//     filename:(req,file,cb) => {
//         const ext = file.mimetype.split("/")[1];
//         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`);
//     }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an Image please upload only an image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'Thid rout is not for password update please use /updateMyPassword.',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};

exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not defiend,use sign up instead',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
// const User = require('./../models/userModel');
// const multer = require('multer');
// const sharp = require('sharp');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// const factory = require('./handlerFactory');

// // const multerStorage = multer.diskStorage({
// //     destination:(req,file,cb) => {
// //         cb(null,"public/img/users");
// //     },
// //     filename:(req,file,cb) => {
// //         const ext = file.mimetype.split("/")[1];
// //         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`);
// //     }
// // });

// const multerStorage = multer.memoryStorage();

// const multerFilter = catchAsync((req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an Image please upload only an image', 400), false);
//   }
// });

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadUserPhoto = catchAsync(upload.single('photo'));

// exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`);

//   next();
// });

// const filterObj = catchAsync((obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });

//   return newObj;
// });

// exports.getMe = catchAsync((req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// });

// exports.updateMe = catchAsync(async (req, res, next) => {
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(
//       new AppError(
//         'Thid rout is not for password update please use /updateMyPassword.',
//         400
//       )
//     );
//   }

//   const filteredBody = filterObj(req.body, 'name', 'email');
//   if (req.file) filteredBody.photo = req.file.filename;

//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: updatedUser,
//     },
//   });
// });

// exports.deleteMe = catchAsync(async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user.id, { active: false });

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// exports.createUser = catchAsync((req, res) => {
//   res.status(500).json({
//     status: 'err',
//     message: 'This route is not defiend,use sign up instead',
//   });
// });

// exports.getAllUsers = factory.getAll(User);
// exports.getUser = factory.getOne(User);
// exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);
