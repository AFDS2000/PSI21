var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/auth');

var app = express();
app.use(cors({
    origin: 'http://localhost:3071'
}));

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://psi021:psi021@cluster0.00uss.mongodb.net/psi021?retryWrites=true';
//var dev_db_url = 'mongodb://psi021:psi021@localhost:27017/psi021?retryWrites=true&authSource=psi021';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
});

// error handler
app.use(function(err, req, res, next) {
    const data = err.data;
    res.status(err.statusCode || 500);
    res.json({
        message: err.message,
        data: data
    })
});

module.exports = app;