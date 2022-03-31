const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const request = new Schema({
    amount: {
        type: Number,
    },
    solutionType:{
        type: String,
    },
    refundType: {
        type: String,
    },
    staffId: {
        type: String,
    },
    summary: {
        type: String
    },
    approve: {
        type: Boolean,
    }, 
    supportCaseId: {
        type: String
    }
},{
    timestamps: true,
})

const Request = mongoose.model('Request', request);

module.exports = Request;