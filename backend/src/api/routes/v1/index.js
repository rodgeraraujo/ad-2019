const express = require('express');
const personRoutes = require('./person.route');
const drawRoutes = require('./draw.route');

const c = require('../../utils/apiCodes');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) =>
  res.status(c.S_API_STATUS.status).send({
    code: c.S_API_STATUS.code,
    status: c.S_API_STATUS.status,
    message: c.S_API_STATUS.message,
  })
);

router.use('/persons', personRoutes);
router.use('/draw', drawRoutes);

module.exports = router;
