Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

mongoose.connect();

app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
 * Exports express.
 *
 * @public
 */
module.exports = app;
