const router = require('express').Router();
const ctrl = require('./user.controller.js');
const handler = require('./../_controllerHandler.js');

router.get('/users', (req, res, next) =>
    handler(ctrl.findAll, [req.query])(req, res, next)
);

router.post('/users', (req, res, next) =>
    handler(ctrl.create, [req.body])(req, res, next)
);

router.get('/users/:id', (req, res, next) =>
    handler(ctrl.findById, [req.params.id, req.query])(req, res, next)
);

module.exports = router;
