const { sockets } = require('./socketUtils.js');

module.exports = {
    on: (io, socket) => {},
    emit: (io, socket) => ({
        newRequest: userId => {
            sockets.emitToContact(userId, 'new contact request');
        },
        acceptRequest: userId => {
            sockets.emitToContact(userId, 'contact request accepted');
        }
    })
};
