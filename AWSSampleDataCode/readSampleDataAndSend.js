var awsthingconn = require('./devMQTTConn');
var parkingMeters = require('./meters.json');
const fs = require('fs');

// var sampleData = fs.readFileSync('./data/fivesamples.txt');
var sampleData = fs.readFileSync('./data/sample_data.json.txt');
var testData = JSON.parse(sampleData)
const async = require('async');

const asyncQueueTimeout = 1000;

connections = {};
numberOfDevices = Object.keys(parkingMeters).length;
numberOfDevices = Object.keys(parkingMeters).length;
counter = 0;


console.log('Number of Sample Entries: ' + testData.length);

for (var meterId in parkingMeters) {
    connections[meterId] = awsthingconn(meterId, function() {
        console.log('Connection Established');
        connections[meterId].connectionStatus = true;
        console.log('Status: ' + connections[meterId].connectionStatus);
        // connections[meterId].subscribe(parkingMeters[meterId].thingName + '/occupyStatus/');
        connections[meterId].subscribe('occupyStatus/' + parkingMeters[meterId].thingName + '/#');
        counter++;
        console.log(counter);
        if (counter == numberOfDevices) {
            startPublishingData(function () {
                console.log('Returned');
            });
        }
    });
    
}

var startPublishingData = function(cb) {
    cb();
    console.log('Done with connection setup');
    async.eachSeries(testData, publishEntryData, onComplete);
}

function onComplete(err) {
 
    if(err) throw err;
    console.log('Done with all entries');
    for (var meterId in parkingMeters) {
        // connections[meterId].unsubscribe(parkingMeters[meterId].thingName + '/occupyStatus/');
        // connections[meterId].unsubscribe('occupyStatus/' + parkingMeters[meterId].thingName);
        // connections[meterId].end();
    }

}
entryNumber = 0;
function publishEntryData(entry, callback) {

    var now = Math.floor((new Date()).getTime() / 1000);
    console.log(now);
    // console.log(entry);
    meterId = entry.meter.number;

    var data = JSON.stringify({ entry: (entryNumber + 1), meterId: meterId, thingName: parkingMeters[meterId].thingName, isOccupied: entry.isOccupied, timestamp: entry.timestamp});
    console.log(data);
    entryNumber++;

    // connections[meterId].publish(parkingMeters[meterId].thingName + '/occupyStatus/', data, {}, function(err){
    connections[meterId].publish('occupyStatus/'+ parkingMeters[meterId].thingName, data, {}, function(err){
            console.log('Pub Return: ' + err);
        });
    setTimeout(function(){
        callback();
    },asyncQueueTimeout);

} 


