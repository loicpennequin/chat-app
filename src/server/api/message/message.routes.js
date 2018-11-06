const ctrl = require('./message.controller.js');
const handler = require('./../_controllerHandler.js');

module.exports = (privateRouter, publicRouter) => {
    privateRouter.post('/messages', (req, res) =>
        handler(ctrl.create, [req.body])(req, res)
    );

    privateRouter.get('/messages/:id', (req, res) =>
        handler(ctrl.findByUser, [req.user.id, req.params.id])(req, res)
    );
};
