const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const myLogger = require('winston');
const errorHander = require('errorhandler');

const portNumber = 3000;

const app = express();

app.listen(portNumber);
myLogger.info(`Started listening on port ${portNumber}`); 

