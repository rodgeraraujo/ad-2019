const httpStatus = require('http-status');

const drawProvider = require('../services/drawProvider');
const Draw = require('../models//draw.model');

const APIError = require('../utils/apiError');

const c = require('../utils/apiCodes');

/**
 * Load draw and append to req.
 *
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const draw = await Draw.get(id);

    if (draw.status == 404) return res.json(draw.toJSON());

    req.locals = { draw };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get draw.
 *
 * @public
 */
exports.get = (req, res) =>
  res.json({
    code: c.S_GETTING_DRAW.code,
    message: c.S_GETTING_DRAW.message,
    data: req.locals.draw.transform(),
  });

/**
 * Returns success if draw was successful.
 *
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const resultDraw = await drawProvider.draw();

    if (!resultDraw) {
      res.json(
        new APIError({
          code: c.E_INSIFFICIENT_NUMBER.code,
          status: httpStatus.UNPROCESSABLE_ENTITY,
          message: c.E_INSIFFICIENT_NUMBER.message,
        }).toJSON()
      );
    }

    res.status(httpStatus.OK);
    return res.json({
      code: c.S_DRAW_CREATED.code,
      status: c.S_DRAW_CREATED.status,
      message: c.S_DRAW_CREATED.message,
      data: resultDraw,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Get draw list.
 *
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const draws = await Draw.list(req.query);
    const transformedDraws = draws.map((draw) => draw.transform());
    res.status(httpStatus.OK);
    res.json({
      code: c.S_DRAW_LISTED.code,
      message: c.S_DRAW_LISTED.message,
      data: transformedDraws,
    });
  } catch (error) {
    next(error);
  }
};
