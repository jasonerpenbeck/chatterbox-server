var fs = require('fs');
var _ = require('underscore');
var utils = require('./util');

exports.handler = function(request, response) {

  var messagelog = './files/MessageLog.txt';
  var objectID = 1;

  var actionMap = {

    GET: function(request, response) {

      fs.readFile(messagelog,'utf8', function(err, data) {
        if(err) {
          console.log(err);
        } else {
          var messageArray = data.trim().split('\n');

          _.each(messageArray, function(elem,i) { messageArray[i] = JSON.parse(elem);});
          var responseObject = {results: messageArray.reverse()};
          utils.sendData(response, JSON.stringify(responseObject));

        }
      });
    },

    POST: function(request, response) {
      // console.log('INSIDE POST')
      utils.receiveData(request, function(msg) {

        objectID++;

        var msgObject = {
          createdAt: new Date().toJSON(),
          updatedAt: new Date().toJSON(),
          objectID: objectID,
          username: msg.username,
          text: msg.text || msg.message,
          message: msg.message,
          roomname: msg.roomname
        }
        fs.appendFile(messagelog, JSON.stringify(msgObject) + '\n',function(err) {if(err) {console.log(err);}});
        utils.sendData(response, JSON.stringify({objectID: msgObject.objectID}), 201);
      });
    },

    OPTIONS: function(request, response) {
      utils.sendData(response, null, 200);
    }
  };

//ACTIVATE ACTIONMAP
  actionMap[request.method] ? actionMap[request.method](request, response) : utils.sendData(response, null, 404)

};
