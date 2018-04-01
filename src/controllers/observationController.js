import subscriptionModel from "../models/subscriptionModel";
import matchTopic from "mqtt-match";
import _ from 'underscore';
import log from '../utils/log';

export class ObservationController {
    constructor(topic) {
        this.topic = topic;
    }
    canHandleTopic(topic) {
        return topic.includes(this.topic);
    }
    async handleTopic(topic, observation) {
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
        } catch (err) {
            throw err;
        }
    }
}