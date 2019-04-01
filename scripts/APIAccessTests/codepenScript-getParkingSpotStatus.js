// Example GET request to get the current status of given parking spot

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://f8s3goa69j.execute-api.us-east-1.amazonaws.com/dev/api/parkingspot/4');
xhr.onreadystatechange = function(event) {
  console.log(event.target.response);
};

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

