const httpStatus = require('http-status');
const { omit } = require('lodash');
const Person = require('../models/person.model');
const c = require('../utils/apiCodes');

/**
 * Load person and append to req.
 *
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const person = await Person.get(id);
    console.log(person);
    req.locals = { person };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get person.
 *
 * @public
 */
exports.get = (req, res) =>
  res.json({
    code: c.S_GETTING_PERSON.code,
    message: c.S_GETTING_PERSON.message,
    data: req.locals.person.transform(),
  });

/**
 * Create new person.
 *
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(httpStatus.CREATED);
    res.json({
      code: c.S_PERSON_CREATED.code,
      message: c.S_PERSON_CREATED.message,
      data: savedPerson.transform(),
    });
  } catch (error) {
    next(Person.checkDuplicateEmail(error));
  }
};

/**
 * Update existing person.
 *
 * @public
 */
exports.update = (req, res, next) => {
  const updatedPerson = omit(req.body);
  const person = Object.assign(req.locals.person, updatedPerson);

  person
    .save()
    .then((savedPerson) =>
      res.status(httpStatus.OK).json({
        code: c.S_PERSON_UPDATED.code,
        message: c.S_PERSON_UPDATED.message,
        data: savedPerson.transform(),
      })
    )
    .catch((e) => next(Person.checkDuplicateEmail(e)));
};

/**
 * Get person list.
 *
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const persons = await Person.list(req.query);
    const transformedPersons = persons.map((person) => person.transform());
    res.status(httpStatus.OK);
    res.json({
      code: c.S_PERSON_LISTED.code,
      message: c.S_PERSON_LISTED.message,
      data: transformedPersons,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete person.
 *
 * @public
 */
exports.remove = (req, res, next) => {
  const { person } = req.locals;

  person
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
