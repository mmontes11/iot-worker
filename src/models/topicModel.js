import mongo from '../lib/mongo';

class TopicModel {
    constructor(mongo) {
        this.mongo = mongo;
        this.collectionName = 'topics';
    }
    collection() {
        return this.mongo.collection(this.collectionName);
    }
    upsertTopic(topic) {
        return this.collection().updateOne({ topic }, { $set: { topic } }, { upsert: true });
    }
}

const topicModel = new TopicModel(mongo);

export default topicModel;