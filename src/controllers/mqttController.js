import mqtt from "../lib/mqtt";
import { ObservationController } from "./observationController";
import topicModel from "../models/topicModel";
import config from "../config/index";
import log from "../utils/log";

class MQTTController {
    constructor(mqtt, eventTopic, measurementTopic) {
        this.mqtt = mqtt;
        this.eventController = new ObservationController(eventTopic);
        this.measurementController = new ObservationController(measurementTopic);
    }
    async listen() {
        try {
            await this.mqtt.client.subscribe("#");
        } catch (err) {
            log.logError(err);
            throw err;
        }
        this.mqtt.client.on("message", async (topic, message) => {
            let json;
            try {
                json = JSON.parse(message.toString());
            } catch (err) {
                log.logError(err)
            }
            log.logMQTTTopic(topic, json);
            try {
                await topicModel.upsertTopic(topic)
            } catch (err) {
                log.logError(err);
            }
            try {
                if (this.eventController.canHandleTopic(topic)) {
                    this.eventController.handleTopic(topic, json);
                } else if (this.measurementController.canHandleTopic(topic)) {
                    this.measurementController.handleTopic(topic, json);
                }
            } catch (err) {
                log.logError(err);
            }
        });
    }
}

const mqttController = new MQTTController(mqtt, config.eventTopic, config.measurementTopic);

export default mqttController;