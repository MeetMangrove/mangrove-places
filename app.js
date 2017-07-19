const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const errorHandlers = require('./handlers/errorHandlers');
const lusca = require('lusca');
const dotenv = require('dotenv');
const sass = require('node-sass-middleware');
const passport = require('passport');
const flash = require('express-flash');
const MongoStore = require('connect-mongo')(session);

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create our Express app
 */
const app = express();

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * Import environmental variables from our variables.env file
 */
require('dotenv').config({ path: '.env' });

/**
 * Import models
 */
require('./models/Listing');

/**
 * SASS Configuration
 */
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true
}));

/**
 * Express configuration.
 */
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.DATABASE_DEV || process.env.DATABASE_PROD,
    autoReconnect: true,
    clear_interval: 3600
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  res.locals.path = req.path;
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

/**
 * Exposes a bunch of methods for validating data.
 * Used heavily on userController.validateRegister
 */
app.use(expressValidator());

/**
 * Own routes + error handling
 */
app.use('/', routes);
app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);

module.exports = app;