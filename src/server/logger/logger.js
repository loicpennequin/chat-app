/**
 * Logger configuration.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

const winston = require('winston');
const getLabel = ({ filename }) => {
    const parts = filename.split(filename.indexOf('/') === -1 ? '\\' : '/');
    return parts[parts.length - 1];
};

const myFormat = winston.format.printf(
    info =>
        `${info.level} ${
            info.level === 'error' ? '-  [' + info.label + ']' : ''
        }: ${info.message}`
);

const loggerFn = callingModule => {
    const logger = winston.createLogger({
        // level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        // format: winston.format.json(),
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.label({ label: getLabel(callingModule) }),
            myFormat
        ),
        level: process.env.LOG_LEVEL,
        handleExceptions: true,
        transports: [
            new winston.transports.Console()
            // new winston.transports.File({
            //     filename: './../../logs/error.log',
            //     level: 'error'
            // }),
            // new winston.transports.File({
            //     filename: './../../logs/combined.log'
            // })
        ]
    });

    return logger;
};

module.exports = loggerFn;
