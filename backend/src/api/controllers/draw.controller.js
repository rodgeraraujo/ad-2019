const httpStatus = require('http-status');

const drawProvider = require('../services/drawProvider');
const APIError = require('../utils/apiError');

const c = require('../utils/apiCodes');

/**
 * Returns success if draw was successful.
 *
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const resultDraw = await drawProvider.draw();
    console.log(resultDraw);

    if (!resultDraw) {
      throw new APIError({
        code: c.E_INSIFFICIENT_NUMBER.code,
        status: httpStatus.UNPROCESSABLE_ENTITY,
        message: c.E_INSIFFICIENT_NUMBER.message,
      });
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
