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
    _ = require('underscore');

var connections = {};

/**
 * Creates a new database connection for a certain user
 *
 * @param id
 *      id of the new user (from socket)
 */
exports.newConnection = function (id) {
    var databaseUrl = "db";
    var collections = ["users"];
    connections[id] = mongojs.connect(databaseUrl, collections);
};

exports.addNewPlayer = function (id, username, password) {
    connections[id].users.save({un: username, pw: password}, function (err, saved) {
        if (err || !saved) console.log("ERROR: " + err);
        else console.log("UN: " + saved.un + " PS: " + saved.pw + " saved. (id: " + saved._id + ")");
    })
};

/**
 * Deletes a player when needed.
 *
 * @param id
 *      socket id
 * @param username
 *      string of username to delete from DB
 */
exports.deletePlayer = function (id, username) {

};

/**
 * run a request on the server to see if the username is in the database already.
 *
 * @param id
 * @param username
 *      string of username to check on
 * @param callback
 */
exports.checkPlayer = function(id, username, callback) {
    connections[id].users.findOne({un:username}, function(err, user) {
        callback("", user);
    });
};

/**
 * Determines what to do with a command if the program is waiting for a response from the player
 *
 * @param id
 * @param username
 *      username to check password for
 * @param password
 *      password to test again username
 * @param callback
 */
exports.checkPassword = function(id, username, password, callback) {
    connections[id].users.findOne({un: username, pw: password}, function(err, user) {
        callback("", user);
    })
};