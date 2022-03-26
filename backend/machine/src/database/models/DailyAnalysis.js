const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyAnalysis = new Schema({
    day: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    machineId: {
        type: Number,
        required: true
    },
    machErrors: [{
        errorType: {type: String},
        message: {type: String},
        time: {type: Date}
    }],
    lineData: [{
        code: {type: Number},
        message: {type: String},
        time: {type: Date}
    }],
},{
    timestamps: true,
});

const DailyAnalysis = mongoose.model('DailyAnalysis', dailyAnalysis);

module.exports = DailyAnalysis;