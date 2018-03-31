import mqtt from './lib/mqtt';
import mongo from './lib/mongo';
import mqttController from './controllers/mqttController';
import config from './config/index';
import log from './utils/log';

const mqttBrokerUrl = `mqtt://${config.mqttBrokerHost}:${config.mqttBrokerPort}`;
mqtt.on('connect', () => {
    log.logInfo(`Connected to MQTT Broker ${mqttBrokerUrl}`);
    mqttController.listen();
});
mqtt.on('error', (err) => {
    log.logError(`Error in MQTT Broker ${mqttBrokerUrl}:`);
    log.logError(err);
});
mqtt.on('close', () => {
    log.logInfo(`Disconnected from MQTT Broker ${mqttBrokerUrl}`);
});

const mongoUrl = `${config.mongoUrl}/${config.mongoDb}`;
(async () => {
    try {
        await mongo.connect();
        log.logInfo(`Connected to MongoDB ${mongoUrl}`);
    } catch (err) {
        log.logError(`Error connecting MongoDB ${mongoUrl}:`);
        log.logError(err);
    }
})();

process.on('SIGINT', async () => {
    mqtt.end();
    try {
        await mongo.close();
        log.logInfo(`Disconnected from MongoDB ${mongoUrl}`);
    } catch (err) {
        log.logError(`Error disconnecting from MongoDB ${mongoUrl}:`);
        log.logError(err);
    }
});