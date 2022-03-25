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
    }
},{
    timestamps: true,
})

const SupoortCase = mongoose.model('SupoortCase', supoortCase);

module.exports = SupoortCase;