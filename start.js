// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('🛑 Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
  process.exit();
}

/**
 * Import environmental variables from our variables.env file
 */
require('dotenv').config({ path: '.env' });


/**
 * Import data models
 */
require('./models/Listing');


/**
 * Connect to MongoDB.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Use ES6 Promise

const app = require('./app');
if (app.get('env') === 'development') {
  mongoose.connect(process.env.DATABASE_DEV);
} else {
  mongoose.connect(process.env.DATABASE_PROD);
}
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

/**
 * Start Mangrove Places!
 */
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log('Mangrove Places is running at http://localhost:%d', app.get('port')); 
  console.log('Press CTRL-C to stop\n');
});
