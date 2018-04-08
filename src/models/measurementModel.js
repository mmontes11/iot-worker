import _ from "underscore";
import { MongoModel } from "./mongoModel";
import { ObjectID } from 'mongodb';
import mongo from '../lib/mongo';
import config from '../config/index';

class Measurement extends MongoModel {
    async getMeasurementGrowthRate(currentMeasurement) {
        const currentObjectId = new ObjectID(currentMeasurement._id);
        const pastDate = new Date();
        pastDate.setHours(pastDate.getHours() - config.measurementChangePastIntervalInHours);
        const pipeline = [
            {
                $match: {
                    $and: [
                        { _id: { $ne: currentObjectId }},
                        { phenomenonTime: { $gte: pastDate }},
                        { thing: { $eq: currentMeasurement.thing }},
                        { type: { $eq: currentMeasurement.type }},
                        { 'unit.name': { $eq: currentMeasurement.unit.name }}
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    avgValue: { $avg: "$value" }
                }
            }
        ];
        const aggregationResult = await this.collection().aggregate(pipeline).toArray();
        const pastAvg = _.first(aggregationResult).avgValue;
        if (!_.isUndefined(pastAvg)) {
            return (currentMeasurement.value - pastAvg) / pastAvg;
        } else {
            return undefined;
        }
    }
}

const measurement = new Measurement(mongo, 'measurements');

export default measurement;