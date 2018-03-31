import mqttLib from 'async-mqtt';
import _ from 'underscore';
import config from '../config/index'

class MQTT {
    constructor(host, port, username, password) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.brokerUrl = `mqtt://${this.host}/${this.port}`
    }
    connect() {
        this.client = mqttLib.connect({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password
        });
    }
}

const mqtt = new MQTT(config.mqttBrokerHost, config.mqttBrokerPort, config.mqttBrokerUsername, config.mqttBrokerPassword);

export default mqtt;