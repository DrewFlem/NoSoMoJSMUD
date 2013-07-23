/**
 * A set of basic and often used messages to send to the client
 *
 * User: Andrew
 * Date: 7/19/13
 * Time: 4:33 PM
 */

exports.start = function (socket) {
    var message = "Hello! Welcome to my game! <br> Please give me your username.";
    socket.emit('newMessage', message);
};

exports.general = function (socket, message) {
    socket.emit('newMessage', message);
};