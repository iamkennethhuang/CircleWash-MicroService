const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supportInfo = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required:true,
        trim: true,
    }, 
    email:{
        type: String,
        required:true,
        trim: true,
    },
    phone:{
        type: Number,
        required: false,
    },
    machineType:{
        type: String,
        required: true,
    },
    machineNo: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    payType: {
        type: String,
    },
    fasCardNum:{
        type: String,
    },
    creditCardNum:{
        type: String,
    },
    createAddress: {
        type: String,
    }
}, {
    timestamps: true,
})

const SupportInfo = mongoose.model('SupportInfo', supportInfo);

module.exports = SupportInfo;