const NotificationService = require('../services/notification-service');
const {Authenticate, Authorize } = require('./middlewares/auth');
const { APIError, STATUS_CODES } = require('../utils/app-errors');
const {PublishMessage, SubscribeMessage} = require('../utils');
const {NOTIFICATION_BINDING_KEY} = require('../config');

module.exports = (app, channel) => {
    
    const service = new NotificationService();
    SubscribeMessage(channel, service, NOTIFICATION_BINDING_KEY);
    
}