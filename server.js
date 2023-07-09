const mongoose = require('mongoose');
const dotenv = require('dotenv');

<<<<<<< HEAD
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION.........SHUTTING DOWN');
  console.log(err.name, err.message, err);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    //useFindModify:false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection succesfull');
  });

//console.log(process.env);

// mongoose.connect(process.env.DATABASE_LOCAL,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     //useFindModify:false,
//     useUnifiedTopology: true

// }).then(() => {

//     console.log("DB connection succesfull");
// });
=======
// process.on("uncaughtException",err => {

//     console.log("UNCAUGHT EXCEPTION.........SHUTTING DOWN");
//     console.log(err.name, err.message,err);
//     process.exit(1);

// });

dotenv.config({ path: './config.env' });

const app = require('./app');

//console.log(process.env);

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
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

<<<<<<< HEAD
process.on('unhadledRejection', (err) => {
  console.log('UNHADLED REJECTION.........SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM Received shutting down gracefully....');
  server.close(() => {
    console.log('Process terminated....');
  });
});
=======
// process.on("unhadledRejection",err => {

//     console.log("UNHADLED REJECTION.........SHUTTING DOWN");
//     console.log(err.name, err.message);
//     server.close(()=>{
//         process.exit(1);
//     });

// });
>>>>>>> 44df138c9a7db0e2bc7fd6b01495652db288929e
