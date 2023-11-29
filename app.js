var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./config/config.js');

const models = require('./models');
const passport = require('passport');
const indexRouter = require('./routes/v1');
const cryptoService = require('./services/cryptoService.js');
const {to} = require('./global_functions.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());



app.use(async function (req,res,next){
  if(req && req.headers && req.headers.authorization){
    console.log('check123', req.headers.authorization);
    [err,data] = await to(cryptoService.decrypt(req.headers.authorization));
    req.headers.authorization =  data;
    console.log('===>',req.headers.authorization);
  }
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Controll-Allow-Methods','GET,POST,PUT,PATCH,OPTIONS,DELETE');
  res.setHeader('Access-Controll-Allow-Credentials',true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

models.sequelize.authenticate().then(()=>{
  console.log('connected to sql database:sequelize');
}).catch((err) => {
  console.log('unable to connect to sql database:sequelize',err.message);
});
models.sequelize.sync({alter:true});

app.use('', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
