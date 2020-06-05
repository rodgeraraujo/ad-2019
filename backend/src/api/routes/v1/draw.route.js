const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/draw.controller');

const router = express.Router();

/**
 * Load draw when API with drawId route parameter is hit
 */
router.param('drawId', controller.load);

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
  .post(controller.create)

  /**
   * @api {get} v1/draw List Draw
   * @apiDescription Get a list of draw
   * @apiVersion 1.0.0
   * @apiName ListDraw
   * @apiGroup Draw
   * @apiPermission guest
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Draw per page
   * @apiParam  {String}             [name]       Draw's created at
   *
   * @apiSuccess {Object[]} draw List of draw.
   *
   */
  .get(controller.list);

router
  .route('/:drawId')
  /**
   * @api {get} v1/draw/:drawId Get Draw
   * @apiDescription Get draw information
   * @apiVersion 1.0.0
   * @apiName GetDraw
   * @apiGroup Draw
   * @apiPermission guest
   *
   * @apiSuccess {String}  id         Draw's id
   * @apiSuccess {String}  data       Draw's name
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Not Found 404)    NotFound     Draw does not exist
   */
  .get(controller.get);

module.exports = router;
