module.exports = name => {
    const uName = name.slice(0,1).toUpperCase() + name.slice(1);
    return `/*
* The ${uName} routes.
*
*/
const router = require('express').Router();
const ctrl = require('./../../../controllers/api').withHandler;

router.get('/${name}s', (req, res, next) =>
    ctrl.${uName}('findAll', (req, res, next) => [req.query])(req, res, next)
);

router.get('/${name}s/:id', (req, res, next) =>
    ctrl.${uName}('findById', (req, res, next) => [req.params.id, req.query])(req, res, next)
);

router.post('/${name}s', (req, res, next) =>
    ctrl.${uName}('create', (req, res, next) => [req.body])(req, res, next)
);

router.delete('/${name}s/:id', (req, res, next) =>
    ctrl.${uName}('destroy', (req, res, next) => [req.params.id, req.query])(req, res, next)
);

router.put('/${name}s/:id', (req, res, next) =>
    ctrl.${uName}('update', (req, res, next) => [req.params.id, req.body])(req, res, next)
);

module.exports = router;`
};
