/**
 * Created with JetBrains WebStorm.
 * User: Andrew
 * Date: 7/20/13
 * Time: 1:14 PM
 */


var        _ = require('underscore'),
    messages = require('../messages'),
        pMan = require('../playerManager');

exports.run = function (socket) {
    var playerList = "";
    _.each(pMan.getAll(), function(value, key, list) {
        playerList += value;
        playerList += "<br>";
    });

    messages.generic(socket, "Players currently online...<br>" + playerList);
};