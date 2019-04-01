var AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});


meter = "4";

const params = {
    Key: {
        "meterId" : {
            S: meter
        }
    },
    TableName: "parkingMeterCurrentStatus"
};

dynamodb.getItem(params, function (err, data) {
    console.log('Back from DDB');
    if (err) {
        console.log(err);
        // callback(err);
    } else {
        console.log(data);
        console.log(data.Item.payload.M);
        // callback(null, {isOccupied : data.Item.payload.M.isOccupied.BOOL, timestamp: data.Item.payload.M.timestamp.N}); 
    }
});

