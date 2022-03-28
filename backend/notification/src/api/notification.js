const NotificationService = require('../services/notification-service');
const {Authenticate, Authorize } = require('./middlewares/auth');
const axios = require('axios');
const { APIError, STATUS_CODES } = require('../utils/app-errors');

module.exports = (app) => {
    
    const service = new NotificationService();

    
}