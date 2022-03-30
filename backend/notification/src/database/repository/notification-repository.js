const {Notification} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class NotificationRepository {

    async createNotification({subject, information, authorEmail, recipientEmail, sentTime}){
        try{
            if(typeof recipientEmail === 'string'){
                const newNotification = new Notification({
                    subject: subject,
                    information: information,
                    authorEmail: authorEmail,
                    recipientEmail: [recipientEmail],
                    sentTime: sentTime,
                })
                const newNotificationData = await newNotification.save();
                return newNotificationData;
            }
            if(typeof recipientEmail === 'object'){
                const newNotification = new Notification({
                    subject: subject,
                    information: information,
                    authorEmail: authorEmail,
                    recipientEmail: recipientEmail,
                    sentTime: sentTime,
                })
                const newNotificationData = await newNotification.save();
                return newNotificationData;
            }
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Notification');
        }
    }
}

module.exports = NotificationRepository;