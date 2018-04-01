import mongo from '../lib/mongo';
import matchTopic from "mqtt-match";

class SubscriptionModel {
    constructor(mongo) {
        this.mongo = mongo;
    }
    collection() {
        return this.mongo.db.collection('subscriptions');
    }
    getSubscriptionsMatchingByTopic(topic) {
        return this.collection().find({ topic: topic });
    }
}

const subscriptionModel = new SubscriptionModel(mongo);

export default subscriptionModel;