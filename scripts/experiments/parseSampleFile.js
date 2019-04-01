const fs = require('fs');
var sampleData = fs.readFileSync('./data/sample_data.json.txt');
var testData = JSON.parse(sampleData)
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
var filename = './scripts/experiments/metersampledata.csv';

const csvWriter = createCsvWriter({  
  path: filename,
  header: [
    {id: 'meterid', title: 'meterid'},
    {id: 'timestamp', title: 'timestamp'},
    {id: 'isOccupied', title: 'isOccupied'},
  ]
});

console.log('Total Number of Entries: ', testData.length);
newArray = [];
testData.forEach(function (entry) {
    // console.log(entry);
    console.log(entry.meter.number, entry.timestamp, entry.isOccupied);
    var tmp = {};
    tmp.meterid = entry.meter.number;
    tmp.timestamp = entry.timestamp;
    tmp.isOccupied = entry.isOccupied;
    newArray.push(tmp);
});

csvWriter.writeRecords(newArray)
    .then(() => {
        console.log('Done');
    });
