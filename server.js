/**
 * Main file for setting up server and sockets
 *
 * User: Andrew
 * Date: 7/17/13
 * Time: 11:15 AM
 */

var              app = require('http').createServer(handler)
    ,             io = require('socket.io').listen(app)
    ,             fs = require('fs')
    ,  playerManager = require('./modules/playerManager')
    ,        message = require('./modules/messages')
    , commandHandler = require ('./modules/commandHandler');

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

// Listens for connections from players, does initial connection functions, and sets
//   up our listeners
io.sockets.on('connection', function (socket) {
    playerManager.add(socket.id);
    message.start(socket);
    commandHandler.expect(socket, 'username');

    socket.on('sendCommand', function (command) {
        console.log( "1. " + command);
        commandHandler.sent(socket, command);
    });

    socket.on('disconnect', function(){
        playerManager.remove(socket.id);
    });
});

    /*var databaseUrl = "mydb"; // "username:password@example.com/mydb"
     var collections = ["users", "reports"]
     var db = require("mongojs").connect(databaseUrl, collections);

     db.users.find({sex: "female"}, function(err, users) {
     if( err || !users) console.log("No female users found");
     else users.forEach( function(femaleUser) {
     console.log(femaleUser);
     } );
     });*/

    /*// when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
        // store the username in the socket session for this client
        socket.username = username;
        // store the room name in the socket session for this client
        socket.room = 'room1';
        // add the client's username to the global list
        usernames[username] = username;
        // send client to room 1
        socket.join('room1');
        // echo to client they've connected
        socket.emit('updatechat', 'SERVER', 'you have connected to room1');
        // echo to room 1 that a person has connected to their room
        socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'room1');
    });*/

    // when the client emits 'sendchat', this listens and executes
        // we tell the client to execute 'updatechat' with 2 parameters
        //io.sockets.in(socket.room).emit('updatechat', socket.username, data);


    /*socket.on('switchRoom', function(newroom){
        // leave the current room (stored in session)
        socket.leave(socket.room);
        // join new room, received as function parameter
        socket.join(newroom);
        socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
        // sent message to OLD room
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
        // update socket session room title
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
        socket.emit('updaterooms', rooms, newroom);
    });*/

    // when the user disconnects.. perform this


        /*// remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);*/

    /*console.log(socket.manager.rooms);
    socket.on('message', function (message, callback) {
        console.log("onMessage");
        console.log(message);
    });
    socket.on('disconnect', function () {
        console.log("onDisconnect");
    });
    socket.on('evtFromClient', function (data, data2, data3) {
        console.log("onFromClient");
        console.log(data, data2);
        console.log(data3);
    });

    io.sockets.emit('evtFromServer', "test");
    socket.send('Holy Shizz');

    socket.broadcast.emit('function', 'data1', 'data2');

    socket.join("room1");
    socket.join("room1");

    socket.broadcast.to('room1').emit('function', 'data1', 'data2') // everyone except this socket
    io.sockets.in('room1').emit('function', 'data1', 'data2'); // everyone in room*/