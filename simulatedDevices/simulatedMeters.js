var awsthingconn = require('./devMQTTConn-Sim');
var parkingMeters = require('./simMeters-ParkingMeter2.json');
const fs = require('fs');


var meterId = '6';

function getRandomBool() {
    return Math.random() >= 0.5;
}
  
var now = Math.floor((new Date()).getTime() / 1000);

function publishMessage() {
    var now = Math.floor((new Date()).getTime() / 1000);
    var data = JSON.stringify({ meterId: meterId, thingName: parkingMeters[meterId].thingName, isOccupied: getRandomBool(), timestamp: now});
    console.log(data)
    // conn.publish('simDev/status/' + parkingMeters[meterId].thingName + '/', data, {}, function(err){
    simDeviceConnection.publish('simDev/status/' + parkingMeters[meterId].thingName + '/', data, {}, function(err){
        console.log('Pub Return: ' + err);
    });
};

// function setPinger(devconn) {
function setPinger() {
    // var conn = devconn;
    setInterval(publishMessage, 5000);
};


var simDeviceConnection = awsthingconn(meterId, function() {
    console.log('Connection Established');
    simDeviceConnection.subscribe('simDev/status/' + parkingMeters[meterId].thingName + '/#')
    // setPinger();
    setPinger();
});




