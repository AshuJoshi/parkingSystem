var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


function getData(event) {

    console.log ('Inside ParkingSpotHistory Lambda');
    
    // Integration Request is mapping the params & query into the event object
    console.log('Event Type: ', typeof(event));
    console.log('Event: ', event);
    
    const meter = event.params.meterid;
    console.log('Meter ID: ', meter);
    const type = event.params.type;
    console.log('Type: ', type);
    
    if (type === "limit") {
        var limit = +event.query.limit;
        console.log('Limit: ', limit);
        var params = {
            TableName: "parkingMeterHistory",
            KeyConditionExpression: "meterId = :meter",
            ExpressionAttributeValues:{":meter" : meter},
            ScanIndexForward: false,
            Limit: limit
        };
    } else if (type === "history") {
        var from = +event.query.from;
        var to = +event.query.to;
        var params = {
            TableName: "parkingMeterHistory",
            KeyConditionExpression: "meterId = :meter and #ts between :from and :to",

            ExpressionAttributeValues:{
                ":meter" : meter,
                ":from" : from,
                ":to" : to
            },
            ExpressionAttributeNames: {
                "#ts" : "timestamp"
            },
            ScanIndexForward: false
        };
    }
    console.log(params);

    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Error in query: ", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log('Items requested: ', limit);
            console.log('Items returned: ', data.Items.length);       
            console.log(data);
            var responseData = []; 
            for (var i=0; i<data.Items.length; i++) {
                console.log(data.Items[i]);
                var tmp = {};
                tmp.timestamp = data.Items[i].timestamp;
                tmp.isOccupied = data.Items[i].payload.isOccupied;
                responseData.push(tmp);
    
            }
            console.log(responseData);
        }
    });
        

}

var event = { 
    params: { type: 'history', meterid: '4' },
    query: { to: '1519548910', from: '1519528190' } 

};

console.log(typeof(event));

getData(event);

