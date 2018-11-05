const ctrl = require('./user.controller.js');
const handler = require('./../_controllerHandler.js');

module.exports = (privateRouter, publicRouter) => {
    privateRouter.get('/users', (req, res, next) =>
        handler(ctrl.findAll, [req.query])(req, res, next)
    );

    publicRouter.post('/users', (req, res, next) =>
        handler(ctrl.create, [req.body])(req, res, next)
    );

    privateRouter.get('/users/:id', (req, res, next) =>
        handler(ctrl.findById, [req.params.id, req.query])(req, res, next)
    );
};
