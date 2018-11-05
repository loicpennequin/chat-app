const controllers = require('./../api').controllers;
const { sockets } = require('./socketUtils.js');

const setOffline = async socket => {
    if (socket.user && socket.user.id) {
        const { contacts } = await controllers.User.setOffline(socket.user.id);

        sockets.emitToAllContacts(
            contacts,
            'contact logged out',
            socket => socket.user
        );
    }
};

module.exports = {
    on: (io, socket) => {
        socket.on('disconnect', () => {
            logger.info('Websockets | disconnect');
            // logger.info(`socket disconnected, socketId : ${socket.id}`);
            setOffline(socket);
        });

        socket.on('user logged out', () => {
            logger.info('Websockets | user logged out');
            setOffline(socket);
        });

        socket.on('user logged in', async data => {
            logger.info('Websockets | user logged in');
            const { username, id, contacts } = await controllers.User.setOnline(
                data.id
            );
            socket.user = { username, id };

            sockets.emitToAllContacts(
                contacts,
                'contact logged in',
                socket => socket.user
            );
        });
    },
    emit: (io, socket) => {}
};
