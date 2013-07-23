/**
 * playerManager that manages all sessions for all the players.
 * Default is a "Guest_" until user logs in
 *
 * User: Andrew
 * Date: 7/19/13
 * Time: 2:25 PM
 */

var _ = require('underscore');

var players = {};

/**
 * Add a Guest user to current player pool
 *
 * @param sessionId
 * @returns {}
 */
exports.add = function (sessionId) {
    console.log("add: ", sessionId);
    players[sessionId] = "Guest_" + sessionId;
};

/**
 * Update a user currently in the player pool
 *
 * @param sessionId
 * @param userName
 * @returns {}
 */
exports.update = function (sessionId, userName) {
    if (_.contains(players, "Guest_" + sessionId)) {
        players[sessionId] = userName;
    }
};

/**
 * Remove a user from the current player pool
 *
 * @param sessionId
 * returns {}
 */
exports.remove = function (sessionId) {
    players[sessionId] = undefined;

    try {
        delete players[sessionId];
    } catch(e){
        console.log("ERROR: playerManager.remove(): " + e);
    }
};

/**
 * gets a User name by sessionId
 *
 * @param sessionId
 * @returns {string} Returns a username found by session ID
 */
exports.getUser = function (sessionId) {
    return players[sessionId];
};

/**
 * Get All players (sessionId & userName)
 *
 * @returns {object} returns object that has all sessionIDs and Player Names
 */
exports.getAll = function () {
    return players;
};