/**
 * Logger configuration.
 *
 * @author Daria <lo.pennequin@gmail.com>
 */

const winston = require('winston');
const myFormat = winston.format.printf(
    info =>
        `${info.level} ${
            info.level === 'error' ? '-  [' + info.label + ']' : ''
        }: ${info.message}`
);


const logger = winston.createLogger({
    // level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    // format: winston.format.json(),
    format: winston.format.combine(
        winston.format.colorize(),
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



module.exports = logger;
