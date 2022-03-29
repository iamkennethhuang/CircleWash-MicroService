const NotificationService = require('../services/notification-service');
const {Authenticate, Authorize } = require('./middlewares/auth');
const { APIError, STATUS_CODES } = require('../utils/app-errors');
const {PublishMessage, SubscribeMessage} = require('../utils');
const {SUPPORT_CASE_BINDING_KEY, EMPLOYEE_BINDING_KEY} = require('../config');

module.exports = (app, channel) => {
    
    const service = new NotificationService();
    SubscribeMessage(channel, service, SUPPORT_CASE_BINDING_KEY);
    SubscribeMessage(channel, service, EMPLOYEE_BINDING_KEY);
    
}