const socketio = require('socket.io');
const connexionEvents = require('./connexionEvents.js');
let io, socket;

module.exports = {
    init: http => {
        io = socketio.listen(http);

        io.on('connection', _socket => {
            socket = _socket;
            // logger.info(`socket connected, socketId : ${socket.id}`);

            connexionEvents(io, socket);
        });
    },
    io: () => io,
    socket: () => socket
};
