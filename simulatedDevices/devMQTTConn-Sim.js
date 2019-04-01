require('dotenv').config();
var awsIot = require('aws-iot-device-sdk');
var parkingMeters = require('./simMeters-ParkingMeter2.json');

var deviceAWSIoT = function(meterId, cb) {

    console.log('In deviceAWSIoT');
    this.connectionStatus = false;

    selecterMeter = meterId;
    this.thingConnection = awsIot.device({
        keyPath : parkingMeters[meterId].keyPath,
        certPath : parkingMeters[meterId].certPath,
        caPath: process.env.CA_PATH,
        clientId: parkingMeters[meterId].thingName,
        host: process.env.AWS_IOT,
        debug: true
    });

    this.thingConnection
        .on('connect', function(connack) {
        // console.log(connack);
        console.log('connect');
        cb();

    });

    this.thingConnection
        .on('message', function(topic, payload) {
            console.log('message', topic, payload.toString());
          });

    return this.thingConnection;
};

module.exports = deviceAWSIoT;

