const controllers = require('./../api').controllers;

module.exports = (io, socket) => {
    socket.on('disconnect', () => {
        logger.info(`socket disconnected, socketId : ${socket.id}`);
        if (socket.user && socket.user.id) {
            controllers.User.setOffline(socket.user.id);
        }
    });

    socket.on('user logged in', async data => {
        const { username, id, contacts } = await controllers.User.setOnline(
            data.id
        );
        socket.user = { username, id };
        Object.keys(io.sockets.sockets).forEach(_socket => {
            const user = io.sockets.sockets[_socket].user;

            if (user && contacts.some(c => c.id === user.id)) {
                logger.info('emitting to ' + user.username);
                io.to(_socket).emit('contact logged in', {
                    username: user.username
                });
            }
        });
    });
};
