var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


function getData() {
    console.log ('Inside ParkingSpotHistory Lambda');
    
    var params = {
            TableName: "parkingMeterCurrentStatus",
            FilterExpression: "payload.isOccupied = :val",
            ExpressionAttributeValues:{
                ":val" : false
            }
    };
    
    console.log(params);

    docClient.scan(params, function(err, data) {
        if (err) {
            console.log("Error in query: ", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log('Items returned, length of data array: ', data.Items.length);       
            console.log('From returned data Count field items returned: ', data.Count);
            console.log('Total items scanned: ', data.ScannedCount);

            var responseData = []; 
            for (var i=0; i<data.Items.length; i++) {
                console.log(data.Items[i]);
                var tmp = {};
                tmp.meterId = data.Items[i].meterId;
                tmp.timestamp = data.Items[i].payload.timestamp;
                tmp.isOccupied = data.Items[i].payload.isOccupied;
                responseData.push(tmp);
    
            }
            console.log(responseData);
        }
    });
        

}



getData();

