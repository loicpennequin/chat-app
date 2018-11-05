function getIo() {
    const { io, socket } = require('./index.js');
    return { io: io(), socket: socket() };
}

const sockets = {
    forEach: cb => {
        const { io, socket } = getIo();
        Object.keys(io.sockets.sockets).forEach(_socket => {
            cb(io.sockets.sockets[_socket], io, socket);
        });
    },
    emitToAllContacts: (contacts, message, data = () => ({})) => {
        sockets.forEach((_socket, io) => {
            if (_socket.user && contacts.some(c => c.id === _socket.user.id)) {
                io.to(_socket.id).emit(message, data(_socket));
            }
        });
    },
    emitToContact: (contactId, message, data = () => ({})) => {
        sockets.forEach((_socket, io) => {
            if (_socket.user && _socket.user.id === parseInt(contactId)) {
                logger.info(`emitting to ${_socket.user.username}`);
                io.to(_socket.id).emit(message, data(_socket));
            }
        });
    }
};

module.exports = { sockets };
