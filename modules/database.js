/**
 * Controls all access to the Database
 *
 * User: Andrew
 * Date: 7/30/13
 * Time: 12:52 PM
 */

var messages = require('./messages'),
    pMan = require('./playerManager'),
    mongojs = require('mongojs');

var connections = {};

exports.newConnection = function (id) {
    var databaseUrl = "db";
    var collections = ["users"];
    connections.id = mongojs.connect(databaseUrl, collections);
};

exports.addNewPlayer = function (id, username, password) {
    console.log("ADD NEW PLAYER TO DATABASE!!!");
};

exports.deletePlayer = function (id, username) {

};

exports.checkPlayer = function(id, username) {
    connections.id.users.find({name:username}, function(err, users) {
        return !(err || !users.length);
    });
};

exports.checkPassword = function(id, username, password) {

};

/*
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
});*/
