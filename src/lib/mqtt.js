import mqtt from 'async-mqtt';
import _ from 'underscore';
import config from '../config/index'

const mqttClient = mqtt.connect({
    host: config.mqttBrokerHost,
    port: config.mqttBrokerPort,
    username: config.mqttBrokerUsername,
    password: config.mqttBrokerPassword
});

if (_.isUndefined(mqttClient.brokerUrl)) {
    mqttClient.brokerUrl = `mqtt://${config.mqttBrokerHost}/${config.mqttBrokerPort}`;

}

export default mqttClient;