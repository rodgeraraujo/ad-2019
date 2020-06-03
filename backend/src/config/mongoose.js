const mongoose = require('mongoose');
const logger = require('./../config/logger');
const { mongo, env } = require('./vars');

// Set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// Print logs in development env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo database.
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose
    .connect(mongo.uri, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connected...'));
  return mongoose.connection;
};
