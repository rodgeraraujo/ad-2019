const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api/routes/v1');

/**
 * Express instance.
 *
 * @public
 */
const app = express();

// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Mount the api v1 routes
app.use('/v1', routes);

module.exports = app;
