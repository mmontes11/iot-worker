export default {
    env: 'development',
    nodePort: 10000,
    mongoUrl: 'mongodb://localhost:27017',
    mongoDb: 'IoT',
    mqttBrokerHost: 'localhost',
    mqttBrokerPort: 1883,
    mqttBrokerUsername: undefined,
    mqttBrokerPassword: undefined,
    eventTopic: 'event',
    measurementTopic: 'measurement',
    debug: true
};