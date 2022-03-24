const {Employee} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class EmployeeRepository {

    async createEmployee({email, password, encryptPassword, firstName, lastName, salt, role}){
        try{
            const newEmployee = new Employee({
                email: email,
                password: password,
                encryptPassword: encryptPassword,
                firstName: firstName,
                lastName: lastName,
                salt: salt,
                role: role
            })
            const newEmployeeData = await newEmployee.save();
            return newEmployeeData;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Employee');
        }
    }

    async findEmployee({ email }){
        try{
            const profile = await Employee.findOne({email: email});
            return profile;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Employee');
        }
    }

    async isEmployeeEmail({email}){
        Employee.findOne({email: email}, (err, doc) => {
            if (err) {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on isEmployeeEmail');
            }
            if (doc) {
                return true;
            }else{
                return false;
            }
        });
    }

    async findEmployeeById({ _id }){
        try{
            const employeeInfo = await Employee.findById(_id);
            return employeeInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Employee');
        }
    }

    async updateEmployeeName({ _id, firstName, lastName}){
        try{
            const employeeOldInfo = await Employee.findByIdAndUpdate(_id , {firstName: firstName, lastName: lastName});
            return employeeOldInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Updating Employee Name');
        }
    }

    async updateEmployeeRole({ _id, role}){
        try{
            const employeeOldInfo = await Employee.findByIdAndUpdate( _id, {role: role});
            return employeeOldInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Updating Employee Role');
        }
    }
    
    async updateEmployeePassword({ _id, password, encryptPassword}){
        try{
            const employeeOldInfo = await Employee.findByIdAndUpdate( _id, {password: password, encryptPassword: encryptPassword});
            return employeeOldInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Updating Employee Password');
        }
    }

    async findAllEmployee(){
        try{
            const allEmployee = await Employee.find({});
            return allEmployee;
        } catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find All Employee');
        }
    }
}

module.exports = EmployeeRepository;