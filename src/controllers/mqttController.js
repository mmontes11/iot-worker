import mqtt from "../lib/mqtt";
import log from "../utils/log";
import topicModel from "../models/topicModel";

class MQTTController {
    constructor(mqtt) {
        this.mqtt = mqtt;
    }
    async listen() {
        try {
            await this.mqtt.subscribe("#");
        } catch (err) {
            log.logError(err);
        }
        this.mqtt.on("message", async (topic, message) => {
            let json;
            try {
                json = JSON.parse(message.toString());
            } catch (err) {
                log.logError(err)
            }
            log.logMQTTMessage(topic, json);
            try {
                await topicModel.upsertTopic(topic)
            } catch (err) {
                log.logError(err);
            }
        });
    }
}

const mqttController = new MQTTController(mqtt);

export default mqttController;