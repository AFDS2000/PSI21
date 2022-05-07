const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/auth');
const usersListRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const teamRouter = require('./routes/team');
var projectsRouter = require('./routes/projects');


const app = express();
app.use(cors({
    origin: 'http://localhost:3071'
}));

// Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = 'mongodb+srv://psi021:psi021@cluster0.00uss.mongodb.net/psi021?retryWrites=true';
//const dev_db_url = 'mongodb://psi021:psi021@localhost:27017/psi021?retryWrites=true&authSource=psi021';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', usersRouter);
app.use('/task', tasksRouter);
app.use('/team', teamRouter);
app.use('/users', usersListRouter);
app.use('/projects', projectsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.statusCode || 500);
    res.json(err.message)
});

module.exports = app;