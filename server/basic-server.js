var http = require("http");
var handler = require('./request-handler');
var utils = require('./util')
var urlParser = require('url')

/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var ip = "127.0.0.1";
var port = 3000;


var server = http.createServer(function(request, response) {

  var path = urlParser.parse(request.url).pathname;
  router[path] ? router[path](request, response) : utils.sendData(response, null, 404);

});

var router = {
  '/classes/messages' : handler.handler,
  '/classes/users' : handler.handler,
  '/classes/rooms' : handler.handler
}

server.listen(port, ip);
