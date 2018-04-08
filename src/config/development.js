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
    measurementChangeTopic: 'measurementChange',
    biotUrl: 'http://localhost:9090/api',
    biotBasicAuthUsername: 'admin',
    biotBasicAuthPassword: 'admin',
    biotUsername: 'admin',
    biotPassword: 'aA12345678&',
    debug: true
};