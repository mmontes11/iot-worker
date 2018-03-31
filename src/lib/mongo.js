import MongoClient from 'mongodb';
import config from "../config/index";

class Mongo {
    constructor(url, dbName) {
        this.url = url;
        this.dbName = dbName;
    }
    async connect() {
        try {
            this.client = await MongoClient.connect(this.url);
            this.db = this.client.db(this.dbName);
            return this;
        } catch (err) {
            throw err;
        }
    }
    async close() {
        try {
            await this.client.close();
        } catch (err) {
            throw err;
        }
    }
    collection(collectionName) {
        return this.db.collection(collectionName);
    }
}

const mongo = new Mongo(config.mongoUrl, config.mongoDb);

export default mongo;