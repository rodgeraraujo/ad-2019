const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/draw.controller');

const router = express.Router();

router
  .route('/')

  /**
   * @api {patch} v1/drawer Create drawer
   * @apiDescription Update some fields of a person document
   * @apiVersion 1.0.0
   * @apiName CreateDraw
   * @apiGroup Draw
   * @apiPermission guest
   *
   */
  .post(controller.create);

module.exports = router;
