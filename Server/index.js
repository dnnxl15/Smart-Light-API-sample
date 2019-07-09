'use strict'

const bodyParser = require('body-parser');
const winston = require('winston');
const express = require('express');
const app = express();



app.use(bodyParser.urlencoded({extended:true, limit:'80mb', parameterLimit: 1000000}));
app.use(bodyParser.json({limit:'50mb'}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

require('./startup/logging')();
require('./startup/route')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 3700;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;

//