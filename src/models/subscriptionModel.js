import mongo from '../lib/mongo';
import { MongoModel } from "./mongoModel";

class SubscriptionModel extends MongoModel {
    find(query = {}) {
        return this.collection().find(query);
    }
}

const subscriptionModel = new SubscriptionModel(mongo, 'subscriptions');

export default subscriptionModel;