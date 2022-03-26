const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const monthlyAnalysis = new Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    machineId: {
        type: Number,
        required: true
    },
    pieData: {
        offline: {type: Number},
        disabled: {type: Number},
        idle: {type: Number},
        running: {type: Number},
        diagnostic: {type: Number},
        deuplicate: {type: Number},
        error: {type: Number},
        firmwareDoesntExist: {type: Number}, 
        satellite: {type: Number},
        reader: {type: Number}
    },
},{
    timestamps: true,
});

const MonthlyAnalysis = mongoose.model('MonthlyAnalysis', monthlyAnalysis);

module.exports = MonthlyAnalysis;