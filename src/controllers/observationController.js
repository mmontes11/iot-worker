import subscriptionModel from "../models/subscriptionModel";
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
            const matchedSubscriptionsCursor = await subscriptionModel.getSubscriptionsMatchingByTopic(topic);
            const subscriptions = await matchedSubscriptionsCursor.toArray();
            const notifications = _.map(subscriptions, (subscription) => {
                return {
                    chatId: subscription.chatId,
                    topic,
                    observation
                };
            });
        } catch (err) {
            throw err;
        }
    }
}