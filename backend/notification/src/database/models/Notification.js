const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notification = new Schema({
    subject:{
        type: String,
    },
    information: {
        type: String,
    },
    authorEmail: {
        type: String,
    },
    recipientEmail: {
        type: String,
    },
    sentTime:{
        type: Date,
    },
},{
    timestamps: true,
});

const Notification = mongoose.model('Notification', notification);

module.exports = Notification;