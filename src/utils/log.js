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
    logMQTTMessage(topic, json) {
        this.logInfo(`Message received from topic ${topic} :`);
        this.logInfo(Log._pretifyJSON(json));
    }
    static _pretifyJSON(json) {
        return JSON.stringify(json, undefined, 2);
    }
}

const log = new Log(config.debug);

export default log;