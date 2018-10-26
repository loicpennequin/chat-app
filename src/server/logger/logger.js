/**
 * Logger configuration.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.json(),
    handleExceptions: true,
    transports: [
        new winston.transports.File({
            filename: './../../logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({ filename: './../../logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            level: process.env.LOG_LEVEL,
            colorize: true
        })
    );
}

module.exports = logger;
