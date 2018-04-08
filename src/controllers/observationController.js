import matchTopic from "mqtt-match";
import _ from 'underscore';
import { TopicController} from "./topicController"
import subscriptionModel from "../models/subscriptionModel";
import biotClient from '../lib/biotClient';
import log from '../utils/log';

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
    async handleTopic(topic, measurement) {
        try {
            const notifications = await super.getNotifications(topic, measurement);
            await biotClient.sendMeasurementNotifications(notifications);
        } catch (err) {
            throw err;
        }
    }
}

export { EventController, MeasurementController };