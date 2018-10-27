const path = require('path');
const dotenv = require('dotenv')

module.exports = Object.freeze({
	GENERATORS : Object.freeze({
        CONTROLLERS_PATH: path.join(__dirname, './../src/server/controllers/api'),
        MODELS_PATH: path.join(__dirname, './../src/server/models'),
        ROUTES_PATH: path.join(__dirname, './../src/server/routes/routers/apiRoutes'),
        API_ROUTER_PATH: path.join(__dirname, './../src/server/routes/routers/apiRouter.js'),
        PAGES_PATH: path.join(__dirname, './../src/client/components/pages'),
        ROUTES_SERVICE_PATH: path.join(__dirname, './../src/client/resources/services/routesService.js')
    }),
    SALT_ROUNDS: 12,
    SEED: Object.freeze({
        HOW_MANY_USERS: 20,
        HOW_MANY_BLOGS: 1,
        HOW_MANY_ARTICLES: 10,
        HOW_MANY_COMMENTS: 5,
        HOW_MANY_CATEGORIES: 5,
        HOW_MANY_TAGS: 10,
        TAGS_PER_ARTICLE: 3
    }),
    SESSION_PARAMS : Object.freeze({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
    })
});
