/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var url = require("url");
var querystring = require("querystring");

var messages = [];

var addMessage = function(data) {
  var message = JSON.parse(data);
  message.username = message.username || "";
  message.text = message.text || "";
  message.roomname = message.roomname || "";
  message.createdAt = (new Date()).toJSON();
  messages.push(message);
};
  
var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  var pathname = url.parse(request.url).pathname;

  console.log(url.parse(request.url).query);

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  if (pathname === "/classes/messages") {
    if (request.method === 'GET') {
      statusCode = 200;
      headers['Content-Type'] = "application/json";
      response.writeHead(statusCode, headers);

      var results = messages;
      var data = querystring.parse(url.parse(request.url).query);
      for (var key in data) {
        if (key === "order") {
          var property = data[key];
          var reverse = false;
          if (property[0] === "-") {
            property = property.slice(1);
            reverse = true;
          }
          results.sort(function(a, b) {
            if (a[property] < b[property]) return reverse ? 1 : -1;
            else if (a[property] > b[property]) return reverse ? -1 : 1;
            else return 0;
          });
        }
      }

      response.end(JSON.stringify({results: results}));
    }
    if (request.method === 'POST') {
      statusCode = 201;
      request.on('data', addMessage);
      headers['Content-Type'] = "text/plain";
      response.writeHead(statusCode, headers);
      response.end("post successful");
    } 
    if (request.method ==='OPTIONS') {
      response.writeHead(statusCode, headers);
      response.end();
    }
  } else {
    statusCode = 404;
    /* .writeHead() tells our server what HTTP status code to send back */
    response.writeHead(statusCode, headers);
    
    /* Make sure to always call response.end() - Node will not send
     * anything back to the client until you do. The string you pass to
     * response.end() will be the body of the response - i.e. what shows
     * up in the browser.*/
    response.end();
  }
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = handleRequest;
