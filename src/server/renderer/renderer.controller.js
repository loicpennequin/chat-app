const React = require('react');
const { renderToString } = require('react-dom/server');
const { matchPath } = require('react-router-dom');
const path = require('path');
const template = require('./template.js');
const prefetcher = require('./prefetcher.js');

const getInitialData = async (req, res, routes) => {
    const dataPromises = routes.map(route =>
        prefetcher[route.dataFetchKey](req)
    );
    const fetchedData = await Promise.all(dataPromises);

    const initialData = {
        authenticated: !!req.user,
        ...fetchedData.reduce((acc, current) =>
            Object.assign(acc, { ...current }), {}
        )
    };

    return initialData;
};

module.exports = async (req, res) => {
    logger.info(`AppController : ${req.url}
       ===================================`);

    try {
        const bundlePath = path.join(__dirname, './../views/app.ssr.js');
        if (process.env.NODE_ENV === 'development') {
            delete require.cache[bundlePath];
        }
        const { SSREntry, routes } = require(bundlePath);

        routeMatches = routes.filter(route => matchPath(req.url, route));

        if (
            routeMatches.some(route => route.authLevel === 'private') &&
            !req.isAuthenticated()
        ) {
            res.redirect('/login');
        } else if (
            routeMatches.some(route => route.authLevel === 'public') &&
            req.isAuthenticated()
        ) {
            res.redirect('/dashboard');
        } else {
            const initialData = await getInitialData(req, res, routeMatches);

            const markup = renderToString(
                React.createElement(SSREntry, {
                    location: req.url,
                    context: {},
                    initialData: initialData,
                    routes
                })
            );
            res.send(template('app', markup, initialData));
        }
    } catch (err) {
        logger.error(err.stack);
    }
};
