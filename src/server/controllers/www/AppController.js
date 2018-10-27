const path = require('path');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { matchPath } = require('react-router-dom');
const logger = require('./../../logger/logger.js')(module);

module.exports = async (req, res, next) => {
    logger.info(`AppController : ${req.url}`);
    logger.info(
        `
      =============================================================================`
    );
    try {
        const appPath = path.join(__dirname, '../../views/app.ssr.js');
        if (process.env.NODE_ENV === 'development') {
            delete require.cache[appPath];
        }

        let { SSREntry, routes, RESTInit } = require(appPath);

        // if (req.user) {
        //     setTimeout(() => {
        //         socket.emit('online');
        //     }, 5000);
        // }

        routes = routes.filter(route => matchPath(req.url, route));
        RESTInit({});
        const dataPromises = routes.map(route => {
            return route.fetchFn({
                url: req.params,
                user_id: req.user && req.user.id
            });
        });
        console.log(req.user);
        let initialData = {
            authenticated: !!req.user,
            ...(await Promise.all(dataPromises))
        };
        console.log(initialData);

        const markup = renderToString(
            React.createElement(SSREntry, {
                location: req.url,
                context: {},
                initialData,
                routes
            })
        );
        res.send(`
            <!DOCTYPE html>
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta name="theme-color" content="#ffffff">
                        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
                        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
                        <link rel="manifest" href="/assets/manifest.json">
                        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
                        <title>Pop Network</title>
                        <link href="https://fonts.googleapis.com/css?family=Poiret+One|Lora:400,400i,700|Roboto:400,700" rel="stylesheet">
                        <link rel="stylesheet" href="/assets/app.css" />
                    </head>
                    <body>
                        <div id="app">${markup}</div>
                        <script>window.__INITIAL_DATA__ = ${JSON.stringify(
        initialData
    )};</script>
                        <script src="/assets/runtime.js"></script>
                        <script src="/assets/vendors.js"></script>
                        <script src="/assets/app.js" defer></script>
                    </body>
                </html>
        `);
    } catch (err) {
        logger.error(err.stack);
    }
};
