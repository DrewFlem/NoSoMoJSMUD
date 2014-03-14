/**
 * Created by NAF2239 on 3/14/14.
 */

var database = require('./database'),
    messages = require('./messages');

var expecting = {},
    username = "",
    firstPW = "";

/**
 * Sets up a new expected case for a certain socket/user. The next input from the user should be
 * something pertaining to the expected.
 *
 * if expected is not given, then reset the expect.
 *
 * @param socket
 * @param expected
 */

// either set up a new expected, or if 'expected' param blank, clear the expected.
exports.setExpected = function(socket, expected) {
    if (expected) {
        expecting[socket.id] = expected;
    } else {
        expecting[socket.id] = undefined;
    }
}

exports.isExpecting = function(socket) {
    return expecting[socket.id];
}

/**
 * Determines what to do with a command if the program is waiting for a response from the player
 *
 *
 * @param socket
 * @param command
 *      username - waiting for user to input their username
 */
exports.doExpected = function(socket, command) {
    switch (expecting[socket.id]) {
        case "username":
            if(database.checkPlayer(socket.id, command)) {
                messages.generic(socket, "Hello " + command + ", please enter your password: ");
                expecting[socket.id] = "password";
            } else {
                messages.generic(socket, "The name " + command + " is available, please enter a new password: ");
                expecting[socket.id] = "newPassword";
            }

            break;
        case "newPassword":
            firstPW = command;
            messages.generic(socket, "Thank you, please enter your password again to confirm: ")
            expecting[socket.id] = "passwordTwo";
            break;
        case "passwordTwo":
            if (command === firstPW) {
                database.addNewPlayer(socket, username, command);
            } else {
                messages.generic(socket, "Passwords did not match. Please try again from the start: ");
                expecting[socket.id] = "newPassword";
            }
            break;
        case "password":
            console.log("password");
            break;
        default:
            console.log("whoa mama");
            break;
    }
}