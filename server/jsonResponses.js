const verifyHeader = (request, response, status, object, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    if (object.id) responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    
    return respond(request, response, status, responseXML, 'text/xml');
  }
  
  const jsonString = JSON.stringify(object);
  
  return respond(request, response, status, jsonString, 'application/json');
};

const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  
  verifyHeader(request, response, 200, responseJSON, acceptedTypes);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  verifyHeader(request, response, 404, responseJSON, acceptedTypes);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
  
  verifyHeader(request, response, 403, responseJSON, acceptedTypes);
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };
  
  verifyHeader(request, response, 500, responseJSON, acceptedTypes);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  
  verifyHeader(request, response, 501, responseJSON, acceptedTypes);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query paramter set to true';
    responseJSON.id = 'badRequest';
    return verifyHeader(request, response, 400, responseJSON, acceptedTypes);
  }
  
  return verifyHeader(request, response, 200, responseJSON, acceptedTypes);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
  };
  
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return verifyHeader(request, response, 401, responseJSON, acceptedTypes);
  }
  
  return verifyHeader(request, response, 200, responseJSON, acceptedTypes);
};

module.exports = {
  success,
  notFound,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};