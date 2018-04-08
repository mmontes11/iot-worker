import _ from 'underscore';
import { TopicController} from "./topicController"
import subscriptionModel from "../models/subscriptionModel";
import measurementModel from "../models/measurementModel";
import measurementChangeModel from "../models/measurementChangeModel";
import biotClient from '../lib/biotClient';
import log from '../utils/log';
import config from '../config/index';

class ObservationController extends TopicController {
    async getNotifications(topic, observation) {
        try {
            const notifications = await subscriptionModel.getNotificationsForSubscriptions(topic, 'observation', observation);
            return ObservationController._returnNotifications(notifications, topic);
        } catch (err) {
            throw err;
        }
    }
    static _returnNotifications(notifications, topic) {
        if (!_.isEmpty(notifications)) {
            return notifications;
        } else {
            throw new Error(`No notifications for topic ${topic}`);
        }
    }
}

class EventController extends ObservationController {
    async handleTopic(topic, event) {
        try {
            const notifications = await super.getNotifications(topic, event);
            await biotClient.sendEventNotifications(notifications);
        } catch (err) {
            throw err;
        }
    }
}

class MeasurementController extends ObservationController {
    constructor(topic, mqtt) {
        super(topic);
        this.mqtt = mqtt;
    }
    canHandleTopic(topic) {
        return super.canHandleTopic(topic) && !topic.includes(config.measurementChangeTopic);
    }
    async handleTopic(topic, measurement) {
        try {
            await Promise.all([
                this._sendMeasurementNotifications(topic, measurement),
                this._processMeasurementChange(topic, measurement)
            ]);
        } catch (err) {
            throw err;
        }
    }
    async _sendMeasurementNotifications(topic, measurement) {
        try {
            const notifications = await super.getNotifications(topic, measurement);
            await biotClient.sendMeasurementNotifications(notifications);
        } catch (err) {
            throw err;
        }
    }
    async _processMeasurementChange(topic, measurement) {
        try {
            const growthRate = await measurementModel.getMeasurementGrowthRate(measurement);
            if (!_.isUndefined(growthRate)) {
                const measurementChange = {
                    observation: measurement,
                    growthRate,
                    phenomenonTime: new Date()
                };
                await measurementChangeModel.insertOne(measurementChange);

                const measurementChangeTopic = topic.replace(config.measurementTopic, config.measurementChangeTopic);
                await this.mqtt.publishJSON(measurementChangeTopic, measurementChange);
            }
        } catch (err) {
            throw err;
        }
    }
}

export { EventController, MeasurementController };