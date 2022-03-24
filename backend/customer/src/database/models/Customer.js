const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: false,
    },
    addresses:[
        { type: Schema.Types.ObjectId, ref: 'Address', require: true }
    ],
    salt: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;