// Example GET request to get the history of a given parking spot with timestamp range

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://f8s3goa69j.execute-api.us-east-1.amazonaws.com/dev/api/parkingspot/4/history/?to_ts=1519548910&from_ts=1519528190');
xhr.onreadystatechange = function(event) {
  console.log(event.target.response);
};

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

