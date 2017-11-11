var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

var user = require('./routes/user');
var todos = require('./routes/todos');

var app = express();
mongoose.connect('mongodb://localhost/Todos-Fancy', { useMongoClient: true })
mongoose.Promise = global.Promise;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/login', user);
app.use('/api', todos);


module.exports = app;
