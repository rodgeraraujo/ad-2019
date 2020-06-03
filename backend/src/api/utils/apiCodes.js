/**
 * Define API code for reponse messages
 */
module.exports = {
  S_API_STATUS: { code: 'S_API_STATUS', status: 200, message: 'API running successfully' },
  E_PERSON_NOT_FOUND: { code: 'E_PERSON_NOT_FOUND', status: 404, message: 'Person does not exist' },
  E_DUPLICATE_EMAIL: { code: 'E_DUPLICATE_EMAIL', status: 409, message: 'Validation error' },
  E_NOT_FOUND: { code: 'E_NOT_FOUND', status: 404, message: 'Resource not found' },
  S_PERSON_CREATED: { code: 'S_PERSON_CREATED', status: 201, message: 'Person created' },
  S_PERSON_UPDATED: { code: 'S_PERSON_UPDATED', status: 200, message: 'Person updated' },
};
