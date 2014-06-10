/**
 * Main file for setting up server and sockets
 *
 * User: Andrew
 * Date: 7/17/13
 * Time: 11:15 AM
 */

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    playerManager = require('./modules/playerManager'),
    message = require('./modules/messages'),
    commandHandler = require('./modules/commandHandler'),
    login = require('./modules/login');

app.listen(8888);

/**
 * Initialization of Server ...and stuff
 * @param req
 * @param res
 */
function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

// Listens for connections from players, does initial connection functions, and sets up our listeners
io.sockets.on('connection', function (socket) {
    // Check to ensure user is new
    if (!playerManager.isUserLoggedIn(socket)) {
        login.start(socket);
    } else {
        message.generic(socket, "Welcome back!");
    }

    // Listens constantly for user input from Client
    socket.on('sendCommand', function (command) {
        commandHandler.sent(socket, command);
    });

    // Kills the player if they log off
    socket.on('disconnect', function(){
        playerManager.remove(socket.id);
    });
});