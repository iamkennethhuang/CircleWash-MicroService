const express = require('express');
const cors = require('cors');
const { machine } = require('./api');
const HandleErrors = require('./utils/error-handler');
const {CronJobRecriveMahineRecordsAndAnalyze, CronJobInsertMachine} = require('./cron/script');

module.exports = async (app, channel) => {
    
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    // app.use(express.static(__dirname + '/public'));

    machine(app, channel);

    CronJobRecriveMahineRecordsAndAnalyze();


    app.use(HandleErrors);

}