const router = require('express').Router();
const Renderer = require('./renderer.controller.js');
const appPath = './../views/app.ssr.js';

if (process.env.NODE_ENV === 'development') {
    delete require.cache[appPath];
}

let { routes } = require(appPath);

routes.forEach(route => {
    router.get(route.path, Renderer);
});

if (process.env.NODE_ENV !== 'development') {
    router.get('/*', Renderer);
}
module.exports = router;
