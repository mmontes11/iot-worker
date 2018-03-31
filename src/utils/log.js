import winston from '../lib/winston';
import _ from 'underscore';
import config from '../config/index';

class Log {
    constructor(debug) {
        this.debug = debug;
    }
    logInfo(message) {
        if (this.debug) {
            winston.info(message);
        }
    }
    logError(message) {
        if (this.debug) {
            winston.error(message);
        }
    }
}

const log = new Log(config.debug);

export default log;