import mqtt from './lib/mqtt';
import mongo from './lib/mongo';
import mqttController from './controllers/mqttController';
import config from './config/index';
import log from './utils/log';

mqtt.on('connect', async () => {
    log.logInfo(`Connected to MQTT Broker ${mqtt.brokerUrl}`);
    try {
        await mqttController.listen();
    } catch (err) {
        log.logError(err);
    }
});
mqtt.on('error', (err) => {
    log.logError(`Error in MQTT Broker ${mqtt.brokerUrl}:`);
    log.logError(err);
});
mqtt.on('close', () => {
    log.logInfo(`Disconnected from MQTT Broker ${mqtt.brokerUrl}`);
});

(async () => {
    try {
        await mongo.connect();
        log.logInfo(`Connected to MongoDB ${mongo.dbUrl}`);
    } catch (err) {
        log.logError(`Error connecting MongoDB ${mongo.dbUrl}:`);
        log.logError(err);
    }
})();

process.on('SIGINT', async () => {
    mqtt.end();
    try {
        await mongo.close();
        log.logInfo(`Disconnected from MongoDB ${mongo.dbUrl}`);
    } catch (err) {
        log.logError(`Error disconnecting from MongoDB ${mongo.dbUrl}:`);
        log.logError(err);
    }
});