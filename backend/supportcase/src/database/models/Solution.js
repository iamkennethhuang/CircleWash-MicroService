const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const solution = new Schema({
    solutionType:{
        type: String,
    },
    amount: {
        type: Number,
    },
    refundType: {
        type: String,
    },
    staffId: {
        type: String,
    },
},{
    timestamps: true,
})

const Solution = mongoose.model('Solution', solution);

module.exports = Solution;