import winston from "winston";
import "winston-mongodb";
import mongo from "../lib/mongo";
import config from "../config";

const transports = [
  new winston.transports.Console({
    timestamp: false,
    json: false,
    colorize: true,
  }),
  new winston.transports.File({
    timestamp: true,
    json: false,
    colorize: true,
    filename: "log-iot-worker.log",
  }),
];

if (config.storeLogsInMongo) {
  transports.push(
    new winston.transports.MongoDB({
      timestamp: true,
      json: true,
      colorize: true,
      db: mongo.dbUrl,
      collection: "log-iot-worker",
    }),
  );
}

const logger = new winston.Logger({
  level: "info",
  transports,
});

export default logger;
