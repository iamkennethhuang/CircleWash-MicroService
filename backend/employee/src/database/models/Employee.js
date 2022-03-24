const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ROLE ={
    ADMIN: 'admin',
    STAFF: 'support'
}

const employee = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
    },
    encryptPassword: {
        type: String,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    perms: [{
        name: {type: String}
    }]
},{
    timestamps: true,
});

const Employee = mongoose.model('Employee', employee);

module.exports = Employee;