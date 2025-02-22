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
const personSchema = new mongoose.Schema(
  {
    uuid: { type: String, maxlength: 36, trim: true },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: '{VALUE} is not a valid email',
        isAsync: false,
      },
    },
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },

    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

/**
 * Add pre-save hooks.
 *
 */
personSchema.pre('save', async function save(next) {
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
personSchema.method({
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
personSchema.statics = {
  /**
   * Get person by id.
   *
   * @param {ObjectId} id - The objectId of person.
   * @returns {Promise<Person, APIError>}
   */
  async get(id) {
    try {
      let person;

      if (mongoose.Types.ObjectId.isValid(id)) {
        person = await this.findById(id).exec();
      }
      if (person) {
        return person;
      }

      return new APIError({
        code: c.E_PERSON_NOT_FOUND.code,
        status: c.E_PERSON_NOT_FOUND.status,
        message: c.E_PERSON_NOT_FOUND.message,
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * List persons in descending order of 'createdAt' timestamp.
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

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error.
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: c.E_DUPLICATE_EMAIL.message,
        errors: [
          {
            field: 'email',
            location: 'body',
            messages: ['"email" already exists'],
          },
        ],
        status: httpStatus.CONFLICT,
        code: c.E_DUPLICATE_EMAIL.code,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },
};

/**
 * @typedef Person
 */
module.exports = mongoose.model('Person', personSchema);
