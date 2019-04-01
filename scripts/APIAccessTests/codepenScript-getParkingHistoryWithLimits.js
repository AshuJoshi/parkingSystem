// Example GET request to get the history of a given parking spot with Limit working backwards from the latest

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://f8s3goa69j.execute-api.us-east-1.amazonaws.com/dev/api/parkingspot/4/limit/?limt=5');
xhr.onreadystatechange = function(event) {
  console.log(event.target.response);
};

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

