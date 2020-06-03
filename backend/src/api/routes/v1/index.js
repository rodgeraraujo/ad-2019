const express = require('express');
const c = require('../../util/apiCodes');

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

module.exports = router;
