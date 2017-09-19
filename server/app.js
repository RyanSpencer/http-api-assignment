const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getClient,
  '/style.css': htmlHandler.getStyle,
  notFound: '',
};

const onRequest = (request, response) => {
  console.dir(request.url);

  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);


console.log(`Listening on Localhost: ${port}`);
