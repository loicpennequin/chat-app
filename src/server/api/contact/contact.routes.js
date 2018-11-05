const ctrl = require('./contact.controller.js');
const handler = require('./../_controllerHandler.js');

module.exports = (privateRouter, publicRouter) => {
    publicRouter.post('/contacts', (req, res) =>
        handler(ctrl.create, [req.body])(req, res)
    );

    publicRouter.get('/contacts/:id/accept', (req, res) =>
        handler(ctrl.accept, [req.params.id])(req, res)
    );
    publicRouter.get('/contacts/:id/decline', (req, res) =>
        handler(ctrl.deny, [req.params.id])(req, res)
    );
};
