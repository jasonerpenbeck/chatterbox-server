/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var handleRequest = function(request, response) {


  var messageObj = {
    createdAt: "2014-09-29T23:07:12.462Z",
    objectID: "f08ibCIQBV",
    roomname: "default",
    text: "This is a test",
    updatedAt: "2014-09-29T23:07:12.462Z",
    username: "Josh"
  };

  var messageArray = [];

  var router = {
    get: function() {
      var responseObject = {results: messageArray};
      respond(JSON.stringify(responseObject));
    },
    post: function() {
      //create the messageobj and push it to the array <---
      respond('hi');
    },
    def: function() {
      respond('hi');
    }
  };

  if (router[request.method]) {
    router[request.method]();
  }
  else {
    router.def();
  }

  var respond = function(arg) {
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end(arg);
  };

  var addMessage = function() {

    //create a message object
    //add that object to the messagesarray
    //
  };


};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.handleRequest = handleRequest;
