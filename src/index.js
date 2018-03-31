import mqtt from './lib/mqtt';
import mongo from './lib/mongo';
import config from './config/index';
import log from './utils/log';

const mqttBrokerUrl = `mqtt://${config.mqttBrokerHost}:${config.mqttBrokerPort}`;
mqtt.on('connect', () => {
    log.logInfo(`Connected to MQTT Broker ${mqttBrokerUrl}`);
});
mqtt.on('error', (err) => {
    log.logError(`Error in MQTT Broker ${mqttBrokerUrl}:`);
    log.logError(err);
});
mqtt.on('close', () => {
    log.logInfo(`Disconnected from MQTT Broker ${mqttBrokerUrl}`);
});

(async () => {
    try {
        await mongo.connect();
        log.logInfo(`Connected to MongoDB ${config.mongoUrl}`);
    } catch (err) {
        log.logError(`Error connecting MongoDB ${config.mongoUrl}:`);
        log.logError(err);
    }
})();

process.on('SIGINT', async () => {
    mqtt.end();
    try {
        await mongo.close();
        log.logInfo(`Disconnected from MongoDB ${config.mongoUrl}`);
    } catch (err) {
        log.logError(`Error disconnecting from MongoDB ${config.mongoUrl}:`);
        log.logError(err);
    }
});