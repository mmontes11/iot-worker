export class MeasurementController {
    constructor(measurementTopic) {
        this.measurementTopic = measurementTopic;
    }
    canHandleTopic(topic) {
        return topic.includes(this.measurementTopic);
    }
    handleTopic(topic, json) {

    }
}