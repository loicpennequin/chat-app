/**
 * Main app file.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

/*  =============================================================================
    Globals
    ============================================================================= */
global.fetch = require('node-fetch');

/*  =============================================================================
    Dependencies
    ============================================================================= */
const logger = require('./logger/logger.js')(module);
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const favicon = require('serve-favicon');
const passport = require('passport');
const session = require('express-session');
const cfg = require('./../../config/constants.js');

/*  =============================================================================
    Init Express App
    ============================================================================= */
const app = express();
const http = require('http').Server(app);

/*  =============================================================================
    Passport Config
    ============================================================================= */
logger.info(`Initializing passport...
      =============================================================================`);
require('./middlewares/passport.js')();

/*  =============================================================================
    App Config
    ============================================================================= */
app.disable('x-powered-by');
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(cfg.SESSION_PARAMS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// app.use(favicon('./public/favicon.ico'));

/*  =============================================================================
    Routes config
    ============================================================================= */
logger.info(`Initializing routes...
      =============================================================================`);
app.use(require('./routes'));

/*  =============================================================================
    Socket.io Config
    ============================================================================= */
logger.info(`Initializing websockets...
      =============================================================================`);
require('./socketIo').init(http);

module.exports = http;
