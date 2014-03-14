/**
 * A set of basic and often used messages to send to the client
 *
 * User: Andrew
 * Date: 7/19/13
 * Time: 4:33 PM
 */

exports.generic = function (socket, message) {
    socket.emit('newMessage', "<br>" + message);
};



