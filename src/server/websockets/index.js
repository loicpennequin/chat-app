const socketio = require('socket.io');
const connexionEvents = require('./connexionEvents.js');
const contactRequestEvents = require('./contactRequestEvents.js');
const messageEvents = require('./messageEvents.js');

let io, socket;

const websockets = {
    init: http => {
        io = socketio.listen(http);

        io.on('connection', _socket => {
            socket = _socket;
            // logger.info(`socket connected, socketId : ${socket.id}`);
            connexionEvents.on(io, socket);
        });
    },
    // Maybe not expose io and socket to other modules
    io: () => io,
    socket: () => socket,
    connectionEvents: connexionEvents.emit(io, socket),
    contactRequestEvents: contactRequestEvents.emit(io, socket),
    messageEvents: messageEvents.emit(io, socket)
};

module.exports = websockets;
