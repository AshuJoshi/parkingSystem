var awsIot = require('aws-iot-device-sdk');
var parkingMeters = require('./meters.json');

var selecterMeter;

var deviceAWSIoT = function(meterId, cb) {

    console.log('In deviceAWSIoT');
    this.connectionStatus = false;

    selecterMeter = meterId;
    this.thingConnection = awsIot.device({
        keyPath : parkingMeters[meterId].keyPath,
        certPath : parkingMeters[meterId].certPath,
        caPath: './certs/AmazonRootCA1.pem',
        clientId: parkingMeters[meterId].thingName,
        host: 'a13azn5ydxwqev-ats.iot.us-east-1.amazonaws.com',
        debug: true
    });

    this.thingConnection
        .on('connect', function(connack) {
        // console.log(connack);
        console.log('connect');
        // this.thingConnection.subscribe(parkingMeters[meterId].thingName + '/occupyStatus/');
        // this.connectionStatus = true;
        cb();

    });

    this.thingConnection
        .on('message', function(topic, payload) {
            console.log('message', topic, payload.toString());
          });
   

    return this.thingConnection;
};

module.exports = deviceAWSIoT;

