const router = require('express').Router();
const AppCtrl = require('./../../controllers/www/AppController.js');
const appPath = './../../views/app.ssr.js';

if (process.env.NODE_ENV === 'development') {
    delete require.cache[appPath];
}

let { routes } = require(appPath);

routes.forEach(route => {
    router.get(route.path, AppCtrl);
});

if (routes.length === 0) {
    router.get('/', AppCtrl);
}

// Have to disable wildcard in development otherwise HMR doesn't work anymore
if (process.env.NODE_ENV !== 'development') {
    router.get('/*', AppCtrl);
}

module.exports = router;
