/**
 * Handles what to do with commands
 *
 * User: Andrew
 * Date: 7/19/13
 * Time: 4:46 PM
 */

var messages = require('./messages'),
        pMan = require('./playerManager');

var commands = {
     "look": require('./commands/look'),
     "help": require('./commands/help'),
    "score": require('./commands/score'),
    "north": require('./commands/north'),
    "south": require('./commands/south'),
     "east": require('./commands/east'),
     "west": require('./commands/west'),
      "who": require('./commands/who')
};
var expecting = {};

/**
 * This function handles interpreting the user command and sending them to appropriate command module
 * @param socket
 * @param command
 */
function interpret(socket, command) {
    if (commands[command]) {
        commands[command].run(socket);
    } else {
        messages.general(socket, "I don't understand!");
        // TODO: implement searching algorithm
    }
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
        messages.general(socket, "Welcome my friend " + command + ". I've been expecting you.");
        exports.expect(socket);
        pMan.update(socket.id, command);
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
    if (expecting[socket.id]) {
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
    if (expected) {
        expecting[socket.id] = expected;
    } else {
        expecting[socket.id] = undefined;
    }
};