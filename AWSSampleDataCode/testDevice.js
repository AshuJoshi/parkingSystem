var awsIot = require('aws-iot-device-sdk');
var parkingMeters = require('./meters.json');

meterId = 2;

var device = awsIot.device({
    keyPath : parkingMeters[meterId].keyPath,
    certPath : parkingMeters[meterId].certPath,
    caPath: './certs/AmazonRootCA1.pem',
    clientId: parkingMeters[meterId].thingName,
    host: 'a13azn5ydxwqev-ats.iot.us-east-1.amazonaws.com',
    debug: true
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//
device
  .on('connect', function(connack) {
    console.log(connack);
    console.log('connect');

    device.subscribe(parkingMeters[meterId].thingName + '/occupyStatus/');

    device.publish(parkingMeters[meterId].thingName + '/occupyStatus/', JSON.stringify({ isOccupied: true, timestamp : Math.floor((new Date()).getTime() / 1000)}), {}, function(err){
        console.log('Pub Return: ' + err);
    });
  });

device
  .on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
  });

