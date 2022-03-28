const ChatService = require('../services/chat-service');
const {Authenticate, Authorize } = require('./middlewares/auth');
const { APIError, STATUS_CODES } = require('../utils/app-errors');
const {CARE_EMAIL} = require('../config');

module.exports = (app) => {
    
    const service = new ChatService();

    app.post('/send', Authenticate, async (req, res, next) => {
        const senderRole = req.user.role;
        const sender = req.user._id;
        const authorEmail = CARE_EMAIL;
        try{
            const {supportCaseId, subject, information, recipientEmail} = req.body;
            await service.sendChatMessageToUser({supportCaseId, subject, information, authorEmail, recipientEmail, senderRole, sender});
            return res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    })

    app.get('/messages', Authenticate, async (req, res, next) => {
        try{
            const {supportCaseId} = req.body;
            const chatmessages = await service.getChatMessages({supportCaseId});
            return res.send(chatmessages);
        } catch (err) {
            next(err);
        }
    })

    app.post('/reply', Authenticate, async (req, res, next) => {
        // try{
        //     const {supportCaseId, subject, information, recipientEmail} = req.body;
        //     await service.sendChatMessageToUser({supportCaseId, subject, information, recipientEmail, senderRole, sender});
        //     return res.sendStatus(200);
        // } catch (err) {
        //     next(err);
        // }
    })
}