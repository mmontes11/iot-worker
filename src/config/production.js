export default {
    env: process.env.NODE_ENV,
    nodePort: process.env.NODE_PORT,
    mongoUrl: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    mongoDb: process.env.MONGO_DB,
    mqttBrokerHost: process.env.MQTT_BROKER_HOST,
    mqttBrokerPort: process.env.MQTT_BROKER_PORT,
    mqttBrokerUsername: process.env.MQTT_BROKER_USERNAME,
    mqttBrokerPassword: process.env.MQTT_BROKER_PASSWORD,
    debug: process.env.IOT_DEBUG
};