# Parking System

Scripts, sample code to build an IOT Solution for Parking System using AWS IoT

## Getting Started

Provides an overview of the directory structures, and scripts in the repo.


### Directories

```
.
|-- AWSSampleDataCode
|-- README.md
|-- data
|-- package-lock.json
|-- package.json
|-- scripts
`-- simulatedDevices
```
README.md is this file

'data' directory has the sample data file for parking spots

'scripts' has the code for testing DynamoDB connections, and also Codepen scripts to access the API Gateway

'AWSSampleDataCode' directory has the code to transmit sample data to AWS IoT Core

'simulatedDevices' directory has the code for generating messages and sending to AWS IoT Core

### Prerequisites

node v8.10 or v8.15
run npm install after cloning the code
'certs' directory is NOT present which has all the device certs
.env file is not present - it has the AWS IOT Host and path to CA


## Authors

* **Ashu Joshi** 

