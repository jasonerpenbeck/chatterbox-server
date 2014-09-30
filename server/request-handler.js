/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var messageArray = [];

var handleRequest = function(request, response) {


  // var messageObj = {
  //   createdAt: "2014-09-29T23:07:12.462Z",
  //   objectID: "f08ibCIQBV",
  //   roomname: "default",
  //   text: "This is a test",
  //   updatedAt: "2014-09-29T23:07:12.462Z",
  //   username: "Josh"
  // };


  var respond = function(arg, statuscode) {
    var statusCode = statuscode;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/plain";
    response.writeHead(statusCode, headers);
    response.end(arg);
  };

  var router = {
    GET: function() {
      console.log(request.url);
      console.log(request.url.slice(0,13));

      if(request.url[1] === '?' || request.url === '/classes/messages' || request.url === '' || request.url.slice(0,13) === '/classes/room') {
        var responseObject = {results: messageArray};
        respond(JSON.stringify(responseObject), 200);
      } else {
        respond('404', 404);
      }
    },
    POST: function() {
      addMessage();
    },
    def: function() {
      respond('hi',200);
    }
  };

  if (router[request.method]) {
    router[request.method]();
  }
  else {
    router.def();
  }

  function addMessage() {

    var msgObject = {
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON()
    };

      var msgstring = "";
      request.on('data', function(arg) {msgstring+=arg;});
      request.on('end', function() {
        var msg = JSON.parse(msgstring);
        msgObject.username = msg.username;
        msgObject.text = msg.text;
        msgObject.message = msg.message;
        msgObject.roomname = msg.roomname;
        messageArray.push(msgObject);
        respond('hi', 201);
      });
  };

};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.handler = handleRequest;
