const { ChatRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError } = require('../utils/app-errors');
const {SENDGRID_API_KEY, CARE_EMAIL} = require('../config');
const client = require('@sendgrid/mail');

client.setApiKey(SENDGRID_API_KEY);

class ChatService{

    constructor(){
        this.repository = new ChatRepository();
    }

    async sendChatMessageToUser({supportCaseId, subject, information, authorEmail, recipientEmail, senderRole, sender}){
        const sentTime = new Date();

        try{
            await client.send({
                to: recipientEmail,// all employee
                from: {
                    email: authorEmail,
                    name: "Circle Wash Support"
                },
                subject: subject,
                html: `<h1>${information}</h1>`
            })
            await this.repository.createChat({supportCaseId});
            await this.repository.createEmail({supportCaseId, subject, information, authorEmail, recipientEmail, sentTime, senderRole, sender});
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getChatMessages({supportCaseId}){

        try{
            const chatMessages = await this.repository.findChat({supportCaseId});
            return chatMessages;
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async SubscribeEvents(payload){

        payload = JSON.parse(payload);
        
        const {event, data} = payload;

        const {supportCaseId, subject, information, authorEmail, recipientEmail, senderRole, sender} = data;

        switch(event){
            case "SEND_EMAIL_MESSAGE":
                this.sendChatMessageToUser({supportCaseId, subject, information, authorEmail, recipientEmail, senderRole, sender}) //need to be complete
                break;
            default:
                break;
        }
    }
}

module.exports = ChatService;