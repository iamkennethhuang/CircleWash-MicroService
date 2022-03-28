const {Chat, Email} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class ChatRepository {

    async createChat({supportCaseId}){
        Chat.findOne({supportCaseId: supportCaseId}, async (err, doc) => {
            if (err){
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Chat');
            }
            if (!doc){
                const newChat = new Chat({
                    supportCaseId: supportCaseId,
                    emails: []
                })
                const newChatData = await newChat.save();
                return newChatData;
            }
        })
    }

    async createEmail({supportCaseId, subject, information, authorEmail, recipientEmail, sentTime, senderRole, sender}){
        
        try{
            const chatObject = await Chat.findOne({supportCaseId: supportCaseId});
            const newEmail = new Email({
                subject: subject,
                information: information,
                authorEmail: authorEmail,
                recipientEmail: recipientEmail,
                sentTime: sentTime,
                senderRole: senderRole,
                sender: sender
            })
            await newEmail.save();
            chatObject.emails.push(newEmail);
            return await chatObject.save();
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Email');
        }
    }

    async findChat({supportCaseId}){      
        try{
            const chatObject = await Chat.findOne({supportCaseId: supportCaseId}).populate('emails');
            return chatObject;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Chat');
        }
    }
}

module.exports = ChatRepository;