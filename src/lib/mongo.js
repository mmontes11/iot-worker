import MongoClient from 'mongodb';
import config from "../config/index";

class Mongo {
    constructor(url) {
        this.url = url;
    }
    async connect() {
        try {
            this.db = await MongoClient.connect(this.url);
            return this;
        } catch (err) {
            throw err;
        }
    }
    async close() {
        try {
            await this.db.close();
        } catch (err) {
            throw err;
        }
    }
}

const mongo = new Mongo(config.mongoUrl);

export default mongo;