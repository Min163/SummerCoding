var createError = require('http-errors');
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var http = require('http');

var indexRouter = require('./routes/index');

var app = express();
var port = process.env.PORT || 3000;

// mongodb setup
var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://Min163:kms-320163@ds151805.mlab.com:51805/heroku_mrrb87cq', {
	usseMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('connected successfully');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

var handlebars = hbs.create({
	defaultLayout : __dirname + '/views/layouts'
});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  res.render('error');
});

// module.exports = app;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
