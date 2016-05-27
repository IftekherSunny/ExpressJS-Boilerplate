const path          = require('path');
const morgan        = require('morgan');
const logger        = require('express-logger');
const express       = require('express');
const favicon       = require('serve-favicon');
const session       = require('express-session');
const mongoose      = require('mongoose');
const validator     = require('express-validator');
const handlebars    = require('express-handlebars');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');


/**
 * Create app instance.
 */
const app = express();



/**
 * Required dotenv.
 */

 // development env
 if (app.get('env') === 'development') {
   require('dotenv').config({path: '.env.dev'});
 }

 // production env
 if (app.get('env') === 'production') {
   require('dotenv').config({path: '.env'});
 }



/**
 * View engine setup.
 */
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
if(app.get('env') === 'production') {
  app.enable('view cache');
}



/**
 * Register middlewares.
 */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(morgan('dev'));

if(app.get('env') === 'production') {
  app.use(logger({path: __dirname + "/logs/express.log"}));
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

//app.use(session({ name: 'express_app', secret: process.env.APP_SECRET, resave: true, saveUninitialized: true, cookie: { secure: false, maxAge: 60000 } }))

app.use(express.static(path.join(__dirname, 'public')));

app.use(validator({
 errorFormatter: function(param, msg, value) {
     var namespace = param.split('.');
     var root = namespace.shift();
     var formParam = root;

     while(namespace.length) {
       formParam += '[' + namespace.shift() + ']';
     }

     return { param : formParam, msg   : msg, value : value };
   }
 }));



 /**
  * Mongoose connection.
  */
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME);



 /**
  * Required routes.
  */
 const home = require('./routes/home');
 const users = require('./routes/users');



/**
 * Bind routes to the app.
 */
app.use('/', home);
app.use('/users', users);



/**
 * Catch 404 and forward to error handler.
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



/**
 * Error handlers.
 */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message: err.message, error: err });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: {} });
});



module.exports = app;
