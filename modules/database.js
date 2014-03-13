/**
 * Controls all access to the Database
 *
 * User: Andrew
 * Date: 7/30/13
 * Time: 12:52 PM
 */

var messages = require('./messages'),
    pMan = require('./playerManager');


var dbAddress = 'mongodb://localhost/test';
mongoose.connect(dbAddress);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback () {
    var playerSchema = mongoose.Schema({
        name: String,
        Age: Number
    })

    playerSchema.methods.speak = function () {
        var greeting = this.name ? "My name is " + this.name : "I don't have a name.";
        console.log(greeting);
    }

    var Player = mongoose.model('Player', playerSchema);

    var playerOne = new Player({name: 'playerOne', age: 38});
    var Andrew = new Player({name: 'Andrew', age: 30});
    var Jennifer = new Player({name: 'Jennifer', age: 29});
    var Nate = new Player({name: 'Nate', age: 5});
    playerOne.speak();
    Andrew.speak();
    Jennifer.speak();
    Nate.speak();

    playerOne.save(function (err, playerOne) {
        if (err) {
            console.log("woops");
        }
    })
    Andrew.save(function (err, Andrew) {
        if (err) {
            console.log("woops");
        }
    })
    Jennifer.save(function (err, Jennifer) {
        if (err) {
            console.log("woops");
        }
    })
    Nate.save(function (err, Nate) {
        if (err) {
            console.log("woops");
        }
    })

    var foundAndrew = '';
    Player.find( {name: 'Andrew'}, 'age', function (err, results) {
        console.log(results);
        foundAndrew = results;
        console.log("hmm " + foundAndrew.name);
    })
});






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