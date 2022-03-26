const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyRecord = new Schema({
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
    historyRecords: [{
        machineId: {type: Number},
        status: {type: Number},
        statusText: {type: String},
        statusTime: {type: Date},
        startTime: {type: Date},
        finishTime: {type: Date},
        mainError: {type: Number},
        mivMatchError: {type: Number}, 
    }],
},{
    timestamps: true,
});

const DailyRecord = mongoose.model('DailyRecord', dailyRecord);

module.exports = DailyRecord;