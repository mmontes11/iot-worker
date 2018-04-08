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
    logMQTTTReceivedMessage(topic, json) {
        this.logInfo(`Message received from topic ${topic} :`);
        this.logInfo(Log._pretifyJSON(json));
    }
    logMQTTPublish(topic, json) {
        this.logInfo(`Published in topic ${topic} :`);
        this.logInfo(Log._pretifyJSON(json));
    }
    logRequest(request, id) {
        if (this.debug) {
            const method = request.options.method, url = request.url.href;
            if (!_.isUndefined(method) && !_.isUndefined(url)) {
                winston.info(`Request ${id} ${method} ${url}`);
            }
            const query = request.options.query;
            if (!_.isUndefined(query)) {
                winston.info(`Request ${id} Query Params`);
                winston.info(Log._pretifyJSON(query));
            }
            const body = request.options.data;
            if (!_.isUndefined(body)) {
                winston.info(`Request ${id} Body`);
                winston.info(Log._pretifyJSON(JSON.parse(body)));
            }
            const headers = request.headers;
            if (!_.isUndefined(headers)) {
                winston.info(`Request ${id} Headers`);
                winston.info(Log._pretifyJSON(headers));
            }
        }
    }
    logResponse(body, response, id) {
        if (this.debug) {
            const statusCode = response.statusCode, statusMessage = response.statusMessage;
            if (!_.isUndefined(statusCode) && !_.isUndefined(statusMessage)) {
                winston.info(`Response ${id} ${statusCode} ${statusMessage}`);
            }
            if (!_.isUndefined(body)) {
                winston.info(`Response ${id} Body`);
                winston.info(Log._pretifyJSON(body));
            }
            const headers = response.headers;
            if (!_.isUndefined(headers)) {
                winston.info(`Response ${id} Headers`);
                winston.info(Log._pretifyJSON(headers));
            }
        }
    }
    static _pretifyJSON(json) {
        return JSON.stringify(json, undefined, 2);
    }
}

const log = new Log(config.debug);

export default log;