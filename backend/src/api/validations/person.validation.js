const Joi = require('@hapi/joi');

module.exports = {
  /**
   * GET /v1/persons
   *
   */
  listPersons: {
    list: {
      query: Joi.object({
        page: Joi.number().min(1),
        perPage: Joi.number().min(1).max(100),
        name: Joi.string(),
        email: Joi.string(),
      }),
    },
  },

  /**
   * POST /v1/persons
   *
   */
  createPerson: {
    create: {
      body: Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().max(128),
      }),
    },
  },

  /**
   * PATCH /v1/persons/:personId
   *
   */
  updatePerson: {
    update: {
      body: Joi.object({
        email: Joi.string().email(),
        name: Joi.string().max(128),
      }),
      params: Joi.object({
        personId: Joi.string()
          .regex(/^[a-fA-F0-9]{24}$/)
          .required(),
      }),
    },
  },
};
