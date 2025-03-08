var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var notesRouter = require('./routes/notes');
var searchRoutes = require('./routes/search');
var MongoStore = require('connect-mongo'); 
var { swaggerUi, specs } = require('./swagger'); 
var apiKeyAuth = require('./middlewares/apiKeyAuth');
var app = express();
var mongoose = require('mongoose');
var dotenv = require('dotenv');

//database connection
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err)); 


app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: { secure: false },
}));

   
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', apiKeyAuth, usersRouter);

app.use('/api/auth', authRouter);
app.use('/api/notes', apiKeyAuth, notesRouter);
app.use('/api/search', apiKeyAuth, searchRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



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

module.exports = app;
