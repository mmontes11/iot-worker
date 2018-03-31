import mongo from '../lib/mongo';

class TopicModel {
    constructor(mongo) {
        this.mongo = mongo;
    }
    collection() {
        return this.mongo.db.collection('topics');
    }
    upsertTopic(topic) {
        return this.collection().updateOne({ topic }, { $set: { topic } }, { upsert: true });
    }
}

const topicModel = new TopicModel(mongo);

export default topicModel;