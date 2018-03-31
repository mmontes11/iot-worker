# iot-worker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ES6 NodeJS worker that subscribes to MQTT topics from [IoT server](https://github.com/mmontes11/iot-server) and sends notifications to [BIoT](https://github.com/mmontes11/biot)

### Run in development

```bash
$ npm start
```

### Build image

```bash
$ npm run build
$ docker build -t iot-worker .