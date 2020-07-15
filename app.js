var express = require('express')
var app = express()
var expressSession=require('express-session')
var myCaptcha = function (req, res, next) {
  var captcha = svgCaptcha.create();
  req.
  console.log('LOGGED')
  console.log(captcha)
  next()
}

app.use(myCaptcha)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
// app.get('/captcha', function (req, res) {
//     var captcha = svgCaptcha.create();
//     req.session.captcha = captcha.text;
//     res.type('svg');
//     res.status(200).send(captcha.data);
//     console.log(res)
//   });
//   app.listen(3001)

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// var svgCaptcha = require('svg-captcha');
// var express = require('express')
// var app = express()
// // var svgCaptcha = require('svg-captcha');

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// module.exports = app;
