<<<<<<< HEAD
// const fs = require("fs");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// const Tour = require("./../../models/tourModel");
// const User = require("./../../models/userModel");
// const Review = require("./../../models/reviewModel");

// dotenv.config({path:"./config.env"});

// mongoose.connect(process.env.DATABASE_LOCAL,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     //useFindModify:false,
//     useUnifiedTopology: true

// }).then(() => {

//     console.log("DB connection succesfull");
// });

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,"utf-8"));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`,"utf-8"));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`,"utf-8"));

// const importData = async ()=>{
//     try{
//         await Tour.create(tours);
//         await User.create(users,{validateBeforeSave:false});
//         await Review.create(reviews);
//         console.log("Data succesfully loaded");

//     }catch(err){
//         console.log(err);
//     }
//     process.exit();
// };

// const deleteData = async ()=>{
//     try{
//         await Tour.deleteMany();
//         await User.deleteMany();
//         await Review.deleteMany();
//         console.log("Data succesfully deleted");

//     }catch(err){
//         console.log(err);
//     }
//     process.exit();
// };

// if(process.argv[2] =='--import'){
//     importData();
// }else if(process.argv[2] =='--delete'){
//     deleteData();
// }
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATA INTO DB
=======
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    //useFindModify:false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection succesfull');
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
<<<<<<< HEAD
    console.log('Data successfully loaded!');
=======
    console.log('Data succesfully loaded');
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

<<<<<<< HEAD
// DELETE ALL DATA FROM DB
=======
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
<<<<<<< HEAD
    console.log('Data successfully deleted!');
=======
    console.log('Data succesfully deleted');
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

<<<<<<< HEAD
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
=======
if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
  deleteData();
}
