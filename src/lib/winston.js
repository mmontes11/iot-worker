import winston from 'winston';
import 'winston-mongodb';
import config from '../config/index';

const logger = new (winston.Logger)({
    level: 'info',
    transports: [
        new winston.transports.Console ({
            timestamp: false,
            json: false,
            colorize: true
        }),
        new winston.transports.File({
            timestamp: true,
            json: false,
            colorize: true,
            filename: 'log-iot-worker.log'
        }),
        new winston.transports.MongoDB({
            timestamp: true,
            json: true,
            colorize: true,
            db: `${config.mongoUrl}/${config.mongoDb}`,
            collection: 'log-iot-worker'
        })
    ]
});

export default logger;