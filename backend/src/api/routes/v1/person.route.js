const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/person.controller');

const { listPersons, createPerson, updatePerson } = require('../../validations/person.validation');

const router = express.Router();

/**
 * Load person when API with personId route parameter is hit
 */
router.param('personId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/persons List Persons
   * @apiDescription Get a list of persons
   * @apiVersion 1.0.0
   * @apiName ListPersons
   * @apiGroup Person
   * @apiPermission guest
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Persons per page
   * @apiParam  {String}             [name]       Person's name
   * @apiParam  {String}             [email]      Persons's email
   *
   * @apiSuccess {Object[]} persons List of persons.
   *
   */
  .get(validate(listPersons), controller.list)

  /**
   * @api {post} v1/persons Create Person
   * @apiDescription Create a new person
   * @apiVersion 1.0.0
   * @apiName CreatePerson
   * @apiGroup Person
   * @apiPermission guest
   *
   * @apiParam  {String}             email     Person's email
   * @apiParam  {String{..128}}      [name]    Person's name
   *
   * @apiSuccess (Created 201) {String}  id         Person's id
   * @apiSuccess (Created 201) {String}  name       Person's name
   * @apiSuccess (Created 201) {String}  email      Person's email
   * @apiSuccess (Created 201) {String}  uuid       Person's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .post(validate(createPerson), controller.create);

router
  .route('/:personId')
  /**
   * @api {get} v1/persons/:id Get Person
   * @apiDescription Get person information
   * @apiVersion 1.0.0
   * @apiName GetPerson
   * @apiGroup Person
   * @apiPermission guest
   *
   * @apiSuccess {String}  id         Person's id
   * @apiSuccess {String}  name       Person's name
   * @apiSuccess {String}  email      Person's email
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Not Found 404)    NotFound     Person does not exist
   */
  .get(controller.get)

  /**
   * @api {patch} v1/persons/:id Update Person
   * @apiDescription Update some fields of a person document
   * @apiVersion 1.0.0
   * @apiName UpdatePerson
   * @apiGroup Person
   * @apiPermission guest
   *
   * @apiParam  {String}             email     Person's email
   * @apiParam  {String{..128}}      [name]    Person's name
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  name       User's name
   * @apiSuccess {String}  email      User's email
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Not Found 404)    NotFound     Person does not exist
   */
  .patch(validate(updatePerson), controller.update)

  /**
   * @api {patch} v1/persons/:personId Delete Person
   * @apiDescription Delete a person
   * @apiVersion 1.0.0
   * @apiName DeletePerson
   * @apiGroup Person
   * @apiPermission guest
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Not Found 404)    NotFound      Person does not exist
   */
  .delete(controller.remove);

module.exports = router;
