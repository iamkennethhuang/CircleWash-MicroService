const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supoortCase = new Schema({
    open:{
        type: Boolean,
    },
    supportInfo: { 
        type: Schema.Types.ObjectId, 
        ref: 'SupportInfo', 
        require: true 
    },
    solution: { 
        type: Schema.Types.ObjectId, 
        ref: 'Solution', 
        require: true 
    },
    request: {
        type: Schema.Types.ObjectId, 
        ref: 'Request', 
        require: true 
    }
    ,
    supportInfoId: {
        type: String,
    },
    status: {
        type: String,
    },
    errorData: [{
        errorType: {type: String},
        message: {type: String},
        time: {type: Date}
    }],
    ganttData: [{
        code: {type: Number},
        message: {type:String},
        time: {type: Date},
        startTime: {type: Date},
        endTime: {type: Date}
    }]
},{
    timestamps: true,
})

const SupoortCase = mongoose.model('SupoortCase', supoortCase);

module.exports = SupoortCase;