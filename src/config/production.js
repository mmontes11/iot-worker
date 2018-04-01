export default {
    env: process.env.NODE_ENV,
    nodePort: process.env.NODE_PORT,
    mongoUrl: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    mongoDb: process.env.MONGO_DB,
    mqttBrokerHost: process.env.MQTT_BROKER_HOST,
    mqttBrokerPort: process.env.MQTT_BROKER_PORT,
    mqttBrokerUsername: process.env.MQTT_BROKER_USERNAME,
    mqttBrokerPassword: process.env.MQTT_BROKER_PASSWORD,
    eventTopic: process.env.EVENT_TOPIC,
    measurementTopic: process.env.MEASUREMENT_TOPIC,
    biotUrl: process.env.BIOT_URL,
    biotBasicAuthUsername: process.env.BIOT_BASIC_AUTH_USERNAME,
    biotBasicAuthPassword: process.env.BIOT_BASIC_AUTH_PASSWORD,
    biotUsername: process.env.BIOT_USERNAME,
    biotPassword: process.env.BIOT_PASSWORD,
    debug: process.env.IOT_DEBUG
};