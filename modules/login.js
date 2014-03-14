/**
 * Created by NAF2239 on 3/14/14.
 */

var database = require('./database'),
    playerManager = require('./playerManager'),
    message = require('./messages'),
    commandHandler = require('./commandHandler'),
    expected = require('./expected');

exports.start = function (socket) {
    database.newConnection(socket.id);

    playerManager.add(socket.id);

    expected.setExpected(socket, 'username');

    var greeting =  "Welcome to the World. <br>" +
                    "Enjoy your stay. <br>" +
                    "Please give me your Login Name, or give me your desired Login Name...";

    message.generic(socket, greeting);
};

