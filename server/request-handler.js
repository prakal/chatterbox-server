var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = defaultCorsHeaders;

  // The outgoing status.
  console.log('request method', request.method);
  if (request.method === "OPTIONS"){
    response.writeHead(200, headers);
    response.end();
  }
  // } else if(request.method === "GET"){
    var statusCode = 200;
  // } else if(request.method === "POST"){
  //   var statusCode = 201;
  // }

  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "text/plain";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  response.writeHead(statusCode, headers);

  var responseData = {results:[]};

  request.on('data', function(chunk) {
    console.log("Received body data:");
    responseData.results.push(chunk);
  });
  console.log('response Object', responseData);
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // console.log('result object',resultObject.client);
  console.log('-------------------------------------------------------------------------');
  response.end(JSON.stringify(responseData));
  // response.end();
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve your chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  // "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "access-control-allow-headers" : "Origin, X-Requested-With, X-Parse-Application-Id, X-Parse-REST-API-Key, Content-Type, Accept"
};

exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
