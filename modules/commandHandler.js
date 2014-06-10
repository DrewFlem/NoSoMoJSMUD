/**
 * Handles what to do with commands
 *
 * User: Andrew
 * Date: 7/19/13
 * Time: 4:46 PM
 */

var messages = require('./messages'),
    database = require('./database'),
    expected = require('./expected');

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

/**
 * This function handles interpreting the user command and sending them to appropriate command module
 * @param socket
 * @param command
 */
function interpret(socket, command) {
    if (commands[command]) {
        commands[command].run(socket);
    } else {
        messages.generic(socket, "I don't understand!");
        // TODO: implement searching algorithm
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
    if (expected.getExpecting(socket)) {
        expected.doExpected(socket, command);
    } else {
        interpret(socket, command);
    }
};