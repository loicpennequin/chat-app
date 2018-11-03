function getIo() {
    const { io, socket } = require('./index.js');
    return { io: io(), socket: socket() };
}

const sockets = {
    forEach: cb => {
        const { io } = getIo();
        Object.keys(io.sockets.sockets).forEach(_socket => {
            cb(io.sockets.sockets[_socket]);
        });
    },
    emitToContacts: (contacts, message, data) => {
        const { io } = getIo();

        Object.keys(io.sockets.sockets).forEach(_socket => {
            const socket = io.sockets.sockets[_socket];

            if (socket.user && contacts.some(c => c.id === socket.user.id)) {
                io.to(_socket).emit(message, data(socket));
            }
        });
    }
};

module.exports = { sockets };
