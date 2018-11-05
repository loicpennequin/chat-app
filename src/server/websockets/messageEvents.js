const { sockets } = require('./socketUtils.js');

module.exports = {
    on: (io, socket) => {},
    emit: (io, socket) => ({
        newMessage: userId => {
            sockets.emitToContact(userId, 'new message');
        }
    })
};
