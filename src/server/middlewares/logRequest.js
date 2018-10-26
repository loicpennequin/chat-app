const logger = require('./../logger/logger.js');

module.exports = (req, res, next) => {
    logger.info(`REST API request : ${req.method} | ${req.url}`);
    logger.info('===================================');
    next();
};
