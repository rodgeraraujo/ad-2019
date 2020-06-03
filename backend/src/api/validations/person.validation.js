const Joi = require('@hapi/joi');

module.exports = {
  // GET /v1/persons
  listPersons: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      email: Joi.string(),
    },
  },

  // POST /v1/persons
  createPerson: {
    body: {
      email: Joi.string().email().required(),
      name: Joi.string().max(128),
      uuid: Joi.string().max(36),
    },
  },

  // PATCH /v1/persons/:personId
  updatePerson: {
    body: {
      email: Joi.string().email(),
      name: Joi.string().max(128),
    },
    params: {
      personId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
  },
};
