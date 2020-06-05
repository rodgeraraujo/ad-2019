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
  S_PERSON_LISTED: { code: 'S_PERSON_LISTED', status: 200, message: 'Listed persons' },
  S_GETTING_PERSON: { code: 'S_GETTING_PERSON', status: 200, message: 'Getting person' },
  E_INSIFFICIENT_NUMBER: {
    code: 'E_INSIFFICIENT_NUMBER',
    status: 406,
    message: 'Need a minimum of 4 people to carry out the draw',
  },
  S_DRAW_CREATED: {
    code: 'S_DRAW_CREATED',
    status: 202,
    message: 'The draw was create successful',
  },
  S_DRAW_LISTED: { code: 'S_DRAW_LISTED', status: 200, message: 'Listed draws' },
  S_GETTING_DRAW: { code: 'S_GETTING_DRAW', status: 200, message: 'Getting draw' },
  E_DRAW_NOT_FOUND: { code: 'E_DRAW_NOT_FOUND', status: 404, message: 'Draw does not exist' },
};
