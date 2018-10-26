/*
* The Contact routes.
*
*/
const ctrl = require('./../../../controllers/api').withHandler;
const { publicRouter, privateRouter } = require('./../apiRouter.js').routers;

privateRouter.get('/users/:userid/contacts', (req, res, next) =>
    ctrl.Contact('findByUser', (req, res, next) => [req.params.userid, req.query])(req, res, next)
);
//
// privateRouter.get('/users/:id', (req, res, next) =>
//     ctrl.User('findById', (req, res, next) => [req.params.id, req.query])(
//         req,
//         res,
//         next
//     )
// );
//
// publicRouter.post('/users', (req, res, next) =>
//     ctrl.User('create', (req, res, next) => [req.body])(req, res, next)
// );
//
// privateRouter.delete('/users/:id', (req, res, next) =>
//     ctrl.User('destroy', (req, res, next) => [req.params.id, req.query])(
//         req,
//         res,
//         next
//     )
// );
//
// privateRouter.put('/users/:id', (req, res, next) =>
//     ctrl.User('update', (req, res, next) => [req.params.id, req.body])(
//         req,
//         res,
//         next
//     )
// );
