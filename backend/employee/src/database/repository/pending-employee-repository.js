const {PendingEmployee} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class PendingEmployeeRepository {

    async createPendingEmployee({email, password, firstName, lastName, status}){
        try{
            const newPendingEmployee = new PendingEmployee({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
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
            const pendingEmployeeInfo = await PendingEmployee.findById(_id);
            return pendingEmployeeInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding PendingEmployee');
        }
    }

    async findAllPendingEmployee(){
        try{
            const allPendingEmployee = await PendingEmployee.find({});
            return allPendingEmployee;
        } catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find All Pending Employee');
        }
    }
    
    async updatePendingEmployeeStatus({employee, pendingId}){
        try{
            const result = await PendingEmployee.findByIdAndUpdate(pendingId, {status: false, approveStaff: employee, approveTime: new Date()});
            return result;
        } catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Update Pending Employee Status');
        }
    }

    async deletePendingEmployee({_id}){
        try{
            const result = await PendingEmployee.findByIdAndRemove(_id);
            return result;
        } catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Delete PendingEmployee');
        }
    }
}

module.exports = PendingEmployeeRepository;