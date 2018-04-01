export class EventController {
    constructor(eventTopic) {
        this.eventTopic = eventTopic;
    }
    canHandleTopic(topic) {
        return topic.includes(this.eventTopic);
    }
    handleTopic(topic, json) {

    }
}