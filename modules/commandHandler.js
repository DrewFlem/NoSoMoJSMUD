/**
 * Handles what to do with commands
 *
 * User: Andrew
 * Date: 7/19/13
 * Time: 4:46 PM
 */

var messages = require('./messages');

var commands = {
    "look": require('./commands/look'),
    "help": require('./commands/help')
}

var expecting = {};

/**
 * This function handles interpretting the user command and sending them to appropriate command module
 * @param socket
 * @param command
 */
function interpret(socket, command) {
    var com = commands[command];
    com.run(socket);
}

/**
 * Determines what to do with a command if the program is waiting for a response from the player
 *
 *
 * @param socket
 * @param command
 *      username - waiting for user to input their username
 */
function handleExpected(socket, command) {
    if (expecting[socket.id] == "username") {
        messages.general(socket, "<br>Welcome my friend " + command + ". I've been expecting you.");
        exports.expect(socket, '');
    }
}

/**
 * Handles what to do first with a user command - whether the program is expecting a certain type
 * of input or if its a new command
 *
 * @param socket
 * @param command
 */
exports.sent = function (socket, command) {
    console.log( command);
    if (expecting[socket.id]) {
        console.log( "3. " + command);
        handleExpected(socket, command);
    } else {
        interpret(socket, command);
    }
};

/**
 * Sets up a new expected case for a certain socket/user. The next input from the user should be
 * something pertaining to the expected.
 *
 * @param socket
 * @param expected
 */
exports.expect = function (socket, expected) {
    console.log("expect: " + expected);
    switch (expected) {
        case "username":
            expecting[socket.id] = 'username';
            break;
        case "":
            expecting[socket.id] = undefined;
        default:

            break;
    }
}