/**
 * Module for any functions having to do with expected input from the user. 
 * 
 * EXAMPLE: the app asks for user to enter a name, the app with expect the next thing from the user
 *          to be his desired name.
 *          
 * Created by DrewFlem on 3/14/14.
 */

var database = require('./database'),
    messages = require('./messages');

var expecting = {},
    username = "",
    firstPW = "";

/**
 * Sets up a new expected case for a certain socket/user. The next input from the user should be
 * something pertaining to the expected.
 * If expected is not given, then reset the expect.
 *
 * @param socket
 * @param expected
 */
exports.setExpected = function(socket, expected) {
    if (expected) {
        expecting[socket.id] = expected;
    } else {
        expecting[socket.id] = undefined;
    }
}

/**
 * Method for checking what is expected of the user to enter for the next command
 *
 * @param socket
 */
exports.getExpecting = function(socket) {
    return expecting[socket.id];
}

/**
 * Determines what to do with a command if the program is waiting for a response from the player
 *
 * @param socket
 * @param command
 *      any input that will be checked in the switch to control the flow
 */
exports.doExpected = function(socket, command) {
    switch (expecting[socket.id]) {
        case "username":
            database.checkPlayer(socket.id, command, function(err, user) {
                if (user) {
                    username = user.un;
                    messages.generic(socket, "Hello " + username + ", please enter your password: ");
                    expecting[socket.id] = "password";
                } else {
                    messages.generic(socket, "The name " + command + " is available, please enter a new password: ");
                    expecting[socket.id] = "newPassword";
                }
            });
            break;
        case "newPassword":
            firstPW = command;
            messages.generic(socket, "Thank you, please enter your password again to confirm: ")
            expecting[socket.id] = "repeatPassword";
            break;
        case "repeatPassword":
            if (command === firstPW) {
                database.addNewPlayer(socket.id, username, command);
                messages.generic(socket, "Thank You " + username);
            } else {
                messages.generic(socket, "Passwords did not match. Please try again from the start: ");
                expecting[socket.id] = "newPassword";
            }
            break;
        case "password":
            console.log(command);
            database.checkPassword(socket.id, username, command, function(err, success) {
                if (success) {
                    messages.generic(socket, "Great! Welcome to the World");
                } else {
                    messages.generic(socket, "Sorry, you're password did not match your login name. Please try again from the top.");
                    expecting[socket.id] = "username"
                }
            });
            break;
        default:
            console.log("whoa mama");
            break;
    }
}