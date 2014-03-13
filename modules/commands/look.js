/**
 * Created with JetBrains WebStorm.
 * User: Andrew
 * Date: 7/20/13
 * Time: 1:14 PM
 */

var messages = require('../messages');

exports.run = function (socket) {
    messages.general(socket, "You see here a void, nothing but the beautiful recessed of your mind.");
};