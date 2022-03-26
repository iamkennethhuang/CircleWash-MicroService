const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const machine = new Schema({
    machineId: {
        type: Number,
        required: true,
        unique: true,
    },
    machNo: {
        type: Number,
        required: true,
        unique: true,
    },
    label: {
        type: String,
        require: true
    },
    dailyRecords: [{
        type: Schema.Types.ObjectId, ref: 'DailyRecord'
    }],
    dailyAnalyses: [{
        type: Schema.Types.ObjectId, ref: 'DailyAnalysis'
    }],
    monthlyAnalyses: [{
        type: Schema.Types.ObjectId, ref: 'MonthlyAnalysis'
    }],
},{
    timestamps: true,
});

const Machine = mongoose.model('Machine', machine);

module.exports = Machine;