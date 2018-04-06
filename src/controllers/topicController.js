export class TopicController {
    constructor(topic) {
        this.topic = topic;
    }
    canHandle(topic) {
        return topic.includes(this.topic);
    }
}