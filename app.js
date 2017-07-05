const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const errorHandlers = require('./handlers/errorHandlers');
const dotenv = require('dotenv');
const passport = require('passport');

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
 * Express configuration.
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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