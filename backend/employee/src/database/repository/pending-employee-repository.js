const {PendingEmployee} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class PendingEmployeeRepository {

    async createPendingEmployee({email, password, encryptPassword, firstName, lastName, salt, status}){
        try{
            const newPendingEmployee = new PendingEmployee({
                email: email,
                password: password,
                encryptPassword: encryptPassword,
                firstName: firstName,
                lastName: lastName,
                salt: salt,
                status: status
            })
            const newPendingEmployeeData = await newPendingEmployee.save();
            return newPendingEmployeeData;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create PendingEmployee');
        }
    }

    async findPendingEmployee({ email }){
        try{
            const profile = await PendingEmployee.findOne({email: email});
            return profile;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding PendingEmployee');
        }
    }

    async isPendingEmployeeEmail({email}){
        PendingEmployee.findOne({email: email}, (err, doc) => {
            if (err) {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on isPendingEmployeeEmail');
            }
            if (doc) {
                return true;
            }else{
                return false;
            }
        });
    }

    async findPendingEmployeeById({ _id }){
        try{
            const pendingEmployeeInfo = await PendingEmployee.findById(_id).populate('addresses');
            return pendingEmployeeInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding PendingEmployee');
        }
    }
}

module.exports = PendingEmployeeRepository;