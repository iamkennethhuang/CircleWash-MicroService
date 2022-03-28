const express = require('express');
const cors = require('cors');
const { notification } = require('./api');
const HandleErrors = require('./utils/error-handler');

module.exports = async (app) => {
    
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    // app.use(express.static(__dirname + '/public'));

    notification(app);

    app.use(HandleErrors);

}