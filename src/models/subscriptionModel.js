import mongo from '../lib/mongo';
import matchTopic from "mqtt-match";

class SubscriptionModel {
    constructor(mongo) {
        this.mongo = mongo;
    }
    collection() {
        return this.mongo.db.collection('subscriptions');
    }
    find(query = {}) {
        return this.collection().find(query);
    }
}

const subscriptionModel = new SubscriptionModel(mongo);

export default subscriptionModel;