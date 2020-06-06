const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../api/routes/v1');

const router = express.Router();

/**
 * Express instance.
 *
 * @public
 */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

/**
 * GET v1/status
 */
router.get('/', (req, res) => res.status(200).send('hellow'));

app.use('/v1', routes);

module.exports = app;
