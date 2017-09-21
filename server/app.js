const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//All the different urls with their respect functions
const urlStruct = {
  '/': htmlHandler.getClient,
  '/success': jsonHandler.success,
  '/style.css': htmlHandler.getStyle,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  console.dir(request.url);

  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);
  
  const acceptedTypes = request.headers.accept.split(',');

  
  //If the url path is defined call the apropriate function
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } 
  else {
  //Else call not found's function
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

http.createServer(onRequest).listen(port);


console.log(`Listening on Localhost: ${port}`);
