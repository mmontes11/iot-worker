import mqtt from "../lib/mqtt";
import { EventController, MeasurementController } from "./observationController";
import { MeasurementChangeController } from "./measurementChangeController"
import topicModel from "../models/topicModel";
import config from "../config/index";
import log from "../utils/log";

class MQTTController {
    constructor(mqtt, eventTopic, measurementTopic, measurementChangeTopic) {
        this.mqtt = mqtt;
        this.eventController = new EventController(eventTopic);
        this.measurementController = new MeasurementController(measurementTopic);
        this.measurementChangeController = new MeasurementChangeController(measurementChangeTopic);
    }
    async listen() {
        try {
            await this.mqtt.client.subscribe("#");
        } catch (err) {
            throw err;
        }
        this.mqtt.client.on("message", async (topic, message) => {
            let json;
            try {
                json = JSON.parse(message.toString());
            } catch (err) {
                log.logError(err);
                return;
            }
            log.logMQTTTReceivedMessage(topic, json);

            let promises = [];
            promises.push(topicModel.upsertTopic(topic));
            if (this.eventController.canHandleTopic(topic)) {
                promises.push(this.eventController.handleTopic(topic, json));
            }
            if (this.measurementController.canHandleTopic(topic)) {
                promises.push(this.measurementController.handleTopic(topic, json));
            }
            if (this.measurementChangeController.canHandleTopic(topic)) {
                promises.push(this.measurementChangeController.handleTopic(topic, json));
            }
            try {
                await Promise.all(promises);
            } catch (err) {
                log.logError(err);
            }
        });
    }
}

const mqttController = new MQTTController(mqtt, config.eventTopic, config.measurementTopic, config.measurementChangeTopic);

export default mqttController;