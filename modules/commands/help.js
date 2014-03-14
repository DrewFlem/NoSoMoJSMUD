/**
 * Created with JetBrains WebStorm.
 * User: Andrew
 * Date: 7/20/13
 * Time: 1:22 PM
 */


var messages = require('../messages');

exports.run = function (socket) {
    messages.generic(socket, "You need help? That's what I'm here for!");
};
