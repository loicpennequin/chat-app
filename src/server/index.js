(async function() {
    /*  =============================================================================
        Dependencies
        ============================================================================= */
    const express = require('express');
    const path = require('path');
    const helmet = require('helmet');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    // const favicon = require('serve-favicon');
    const passport = require('passport');
    const session = require('express-session');

    /*  =============================================================================
        Globals
        ============================================================================= */
    global.logger = require('./logger');
    require('dotenv').config({
        path: path.resolve(process.cwd(), 'config/.env')
    });

    /*  =============================================================================
        Init Express App
        ============================================================================= */
    const app = express();
    const http = require('http').Server(app);

    /*  =============================================================================
        App Config
        ============================================================================= */
    app.disable('x-powered-by');
    app.use(helmet());
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(
        session({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            saveUninitialized: true
        })
    );
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('public'));
    app.use(passport.initialize());
    app.use(passport.session());

    /*  =============================================================================
        Build frontend app
        ============================================================================= */
    if (process.env.NODE_ENV === 'development') {
        logger.info(`===================================
       BUILD APP...START
       ===================================`);
        await require('./build')();
        logger.info(`BUILD APP...DONE
       ===================================`);
    }

    /*  =============================================================================
        Init passport
        ============================================================================= */
    logger.info(`PASSPORT INIT...
       ===================================`);
    require('./auth').passport();
    app.use(require('./auth').authRoutes);

    /*  =============================================================================
        Init REST API routes
        ============================================================================= */
    logger.info(`API ROUTES INIT...
       ===================================`);
    app.use(require('./api').APIroutes);

    /*  =============================================================================
        Init renderer
        ============================================================================= */
    logger.info(`RENDERER INIT...
       ===================================`);
    app.use(require('./renderer'));

    /*  =============================================================================
        Init Websockets
        ============================================================================= */
    logger.info(`WEBSOCKETS INIT...
       ===================================`);
    require('./websockets').init(http);

    /*  =============================================================================
        Server start
        ============================================================================= */
    http.listen(process.env.PORT || 8000, () => {
        logger.info(`SERVER STARTED ON PORT ${process.env.port}
       ===================================`);
    });
})();
