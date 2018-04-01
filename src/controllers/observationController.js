import subscriptionModel from "../models/subscriptionModel";
import matchTopic from "mqtt-match";
import biotClient from '../lib/biotClient';
import _ from 'underscore';
import log from '../utils/log';

class ObservationController {
    constructor(topic) {
        this.topic = topic;
    }
    canHandleTopic(topic) {
        return topic.includes(this.topic);
    }
    async getNotifications(topic, observation) {
        try {
            let notifications = [];
            const cursor = subscriptionModel.find();
            while (await cursor.hasNext()) {
                const subscription = await cursor.next();
                const notificationAlreadyExists = _.some(notifications, (notification) => {
                    return _.isEqual(notification.chatId, subscription.chatId)
                });
                if (!notificationAlreadyExists && matchTopic(subscription.topic, topic)) {
                    notifications.push({
                        chatId: subscription.chatId,
                        topic,
                        observation
                    });
                }
            }
            return notifications;
        } catch (err) {
            throw err;
        }
    }
}

class EventController extends ObservationController {
    constructor(topic) {
        super(topic);
    }
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
    constructor(topic) {
        super(topic);
    }
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