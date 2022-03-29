const express = require('express');
const cors = require('cors');
const { supportcase } = require('./api');
const HandleErrors = require('./utils/error-handler');

module.exports = async (app, channel) => {
    
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    // app.use(express.static(__dirname + '/public'));

    supportcase(app, channel);

    app.use(HandleErrors);

}