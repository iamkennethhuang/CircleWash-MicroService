const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chat = new Schema({
    supportCaseId: {
        type: String,
    },
    emails: [{
        type: Schema.Types.ObjectId, 
        ref: 'Email',  
    }]
},{
    timestamps: true,
});

const Chat = mongoose.model('Chat', chat);

module.exports = Chat;