const express = require('express');
const cors = require('cors');
const { chat } = require('./api');
const HandleErrors = require('./utils/error-handler');

module.exports = async (app) => {
    
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    // app.use(express.static(__dirname + '/public'));

    chat(app);

    app.use(HandleErrors);

}