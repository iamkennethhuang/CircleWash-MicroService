const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: {type: String},
    street: {type: String},
    city: {type: String},
    zip:{type: String},
}, {
    timestamps: true,
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;