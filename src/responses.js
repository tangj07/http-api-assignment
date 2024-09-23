const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const cssIndex = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
  const success = {
    message: 'This is a successful response',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${success.message}</message></response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const successString = JSON.stringify(success);
  return respond(request, response, 200, successString, 'application/json');
};
const getBadRequest = (request, response, acceptedTypes, params) => {
  const badRequest = {
    message: 'This request has the required parameters',
  };
  if (!params.valid || params.valid !== 'true') {
    badRequest.message = 'Missing valid query parameter set to true';
    badRequest.id = 'badRequest';
  }
  if (acceptedTypes[0] === 'application/json') {
    badRequest.message = 'Missing valid query parameter set to true';
    badRequest.id = 'badRequest';
    const badString = JSON.stringify(badRequest);
    return respond(request, response, 400, badString, 'application/json');
  }
  if (acceptedTypes[0] === 'text/xml') {
    badRequest.message = 'Missing valid query parameter set to true';
    badRequest.id = 'badRequest';
    const responseXML = `<response><message>${badRequest.message}</message><id>${badRequest.id}</id></response>`;

    return respond(request, response, 400, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(badRequest);
  return respond(request, response, 200, jsonString, 'application/json');
};

const getUnauthorized = (request, response, acceptedTypes, params) => {
  const unAuthorized = {
    message: 'You have successfully viewed the content.',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    unAuthorized.message = 'Missing loggedIn query parameter set to yes';
    unAuthorized.id = 'unauthorized';
  }
  if (acceptedTypes[0] === 'application/json') {
    unAuthorized.message = 'Missing loggedIn query parameter set to yes';
    unAuthorized.id = 'unauthorized';
    const unAuthorizedString = JSON.stringify(unAuthorized);
    return respond(request, response, 401, unAuthorizedString, 'application/json');
  }
  if (acceptedTypes[0] === 'text/xml') {
    unAuthorized.message = 'Missing valid query parameter set to true';
    unAuthorized.id = 'unauthorized';
    const responseXML = `<response><message>${unAuthorized.message}</message><id>${unAuthorized.id}</id></response>`;

    return respond(request, response, 401, responseXML, 'text/xml');
  }
  const jsonString = JSON.stringify(unAuthorized);
  return respond(request, response, 200, jsonString, 'application/json');
};

const getForbidden = (request, response, acceptedTypes) => {
  const forbidden = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${forbidden.message}</message><id>${forbidden.id}</id></response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }
  const forbiddenString = JSON.stringify(forbidden);
  // returning json as default
  return respond(request, response, 403, forbiddenString, 'application/json');
};

const getInternal = (request, response, acceptedTypes) => {
  const internal = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${internal.message}</message><id>${internal.id}</id></response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }
  const internalString = JSON.stringify(internal);
  return respond(request, response, 500, internalString, 'application/json');
};

const getNotImplemented = (request, response, acceptedTypes) => {
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  if (acceptedTypes[0] === 'text/xml') {
    // creating xml string
    const responseXML = `<response><message>${notImplemented.message}</message><id>${notImplemented.id}</id></response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const notImplementedString = JSON.stringify(notImplemented);
  return respond(request, response, 501, notImplementedString, 'application/json');
};

const getNotFound = (request, response, acceptedTypes) => {
  const notFound = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${notFound.message}</message><id>${notFound.id}</id></response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  const notFoundString = JSON.stringify(notFound);
  return respond(request, response, 404, notFoundString, 'application/json');
};

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssIndex);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getBadRequest,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
  getSuccess,
  getUnauthorized,
};
