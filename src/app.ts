import createError from 'http-errors';
import express, {Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import todoRouter from'./routes/todo';
import usersRouter from'./routes/users';
import pageRouter from'./routes/page';
import productRouter from './routes/products' 
import db from './config/databaseConfig';
// import { v2 as cloudinary } from 'cloudinary';

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   secure: true
// });

// // Log the configuration
// console.log(cloudinary.config());

var app = express();

//Connecting to database
db.sync().then(()=>{
  console.log("Database connected succesfully")
}).catch(err=>{
  console.error("Error connecting to Database", err);
})

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todo', todoRouter);
app.use('/users', usersRouter);
app.use('/', pageRouter);
app.use('/products',productRouter);

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
