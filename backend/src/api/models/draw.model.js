const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const uuidv4 = require('uuid').v4;
const validator = require('validator');
const APIError = require('../utils/apiError');
const c = require('../utils/apiCodes');

/**
 * Person Schema.
 *
 * @private
 */
const darwSchema = new mongoose.Schema(
  {
    uuid: { type: String, maxlength: 36, trim: true },
    data: [
      {
        name: {
          type: String,
          maxlength: 128,
          index: true,
          trim: true,
        },
        email: {
          type: String,
          match: /^\S+@\S+\.\S+$/,
          trim: true,
          lowercase: true,
        },

        secretFriend: {
          name: {
            type: String,
            maxlength: 128,
            index: true,
            trim: true,
          },
          id: {
            type: mongoose.Schema.Types.ObjectId,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Add pre-save hooks.
 *
 */
darwSchema.pre('save', async function save(next) {
  try {
    this.uuid = uuidv4();

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods.
 *
 */
darwSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
darwSchema.statics = {
  /**
   * Get draw by id.
   *
   * @param {ObjectId} id - The objectId of draw.
   * @returns {Promise<Draw, APIError>}
   */
  async get(id) {
    try {
      let draw;

      if (mongoose.Types.ObjectId.isValid(id)) {
        draw = await this.findById(id).exec();
      }
      if (draw) {
        return draw;
      }

      throw new APIError({
        code: c.E_DRAW_NOT_FOUND.code,
        status: c.E_DRAW_NOT_FOUND.status,
        message: c.E_DRAW_NOT_FOUND.message,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List draws in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of persons to be skipped.
   * @param {number} limit - Limit number of persons to be returned.
   * @returns {Promise<Person[]>}
   */
  list({ page = 1, perPage = 30, name, email }) {
    const options = omitBy({ name, email }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage * 1)
      .exec();
  },
};

/**
 * @typedef Draw
 */
module.exports = mongoose.model('Draw', darwSchema);
