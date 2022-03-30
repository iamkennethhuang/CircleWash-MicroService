const { EmployeeRepository, PendingEmployeeRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError } = require('../utils/app-errors');
const { CRYPTR_KEY } = require('../config');
const Cryptr = require('cryptr');
const {PublishMessage} = require('../utils');
const {NOTIFICATION_BINDING_KEY} = require('../config');

const cryptr = new Cryptr(CRYPTR_KEY);

class EmployeeService{

    constructor(channel){
        this.channel = channel;
        this.repository = new EmployeeRepository();
        this.pRepository = new PendingEmployeeRepository();
    }

    async signIn(userInputs){

        const {email, password} = userInputs; 

        try{
            const existingEmployee = await this.repository.findEmployee({email});
            if(existingEmployee){
                const validPassword = await ValidatePassword(password, existingEmployee.password, existingEmployee.salt);
                if(validPassword){
                    const token = await GenerateSignature({ email: existingEmployee.email, _id: existingEmployee._id, role: existingEmployee.role});
                    return FormateData({id: existingEmployee._id, token});
                }
            }
            return FormateData(null);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async signUp(userInputs){
        const {email, password, firstName, lastName} = userInputs;

        try{
            const existingEmployee = await this.repository.isEmployeeEmail({email});

            if(!existingEmployee){
                let salt = await GenerateSalt();
                console.log(salt);
                let userPassword = await GeneratePassword(password, salt);
                let encryptPassword = await cryptr.encrypt(password);
                let role = 'support';
                const newEmployee = await this.repository.createEmployee({ email, password: userPassword, encryptPassword, firstName, lastName, salt, role});
                return FormateData({id: newEmployee._id});
            }
            return FormateData(null);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async signUpPendingEmployee(userInputs){
        const {email, password, firstName, lastName} = userInputs;

        try{
            const existingEmployee = await this.repository.isPendingEmployeeEmail({email});

            if(!existingEmployee){
                let status = true;
                const newPendingEmployee = await this.pRepository.createPendingEmployee({ email, password, firstName, lastName, status});
                return FormateData({newPendingEmployee});
            }
            return FormateData(null);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async getAllEmployee(){
        try{
            const allEmployee = await this.repository.findAllEmployee();
            return FormateData(allEmployee);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async getAllPendingEmployee(){
        try{
            const allEmployee = await this.pRepository.findAllPendingEmployee();
            return FormateData(allEmployee);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async approvePendingEmployee(employeeId, pendingId){
        try{
            const employee = await this.repository.findEmployeeById({_id: employeeId});
            const pendingEmployee = await this.pRepository.findPendingEmployeeById({_id: pendingId})
            await this.pRepository.updatePendingEmployeeStatus({employee, pendingId});
            const newEmployee = await this.signUp({email: pendingEmployee.email, password: pendingEmployee.password, firstName: pendingEmployee.firstName, lastName: pendingEmployee.lastName})
            return FormateData(newEmployee);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async denyPendingEmployee(pendingId){
        try{
            const result = await this.pRepository.deletePendingEmployee({_id: pendingId});
            return FormateData(result);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async getEmployee(userInputs){
        const {_id} = userInputs;

        try{
            const employeeInfo = await this.repository.findEmployeeById({_id});
            return FormateData(employeeInfo);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async manageRole({_id, role}){
        try{
            const result = await this.repository.updateEmployeeRole({_id, role});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async manageName(_id, firstName, lastName){
        try{
            const result = await this.repository.updateEmployeeName({_id, firstName, lastName});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async managePassword(_id, password){
        try{
            const existingEmployee = await this.repository.findEmployeeById({_id});
            let salt = existingEmployee.salt;
            let userPassword = await GeneratePassword(password, salt);
            let encryptPassword = await cryptr.encrypt(password);
            const result = await this.repository.updateEmployeePassword({_id, password: userPassword, encryptPassword});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getAllEmployeeEmailsWithEvent({employeeEvent}){
        try{
            const allEmployee = await this.repository.findAllEmployee();
            const employeeEmails = allEmployee.map(function(employee){
                return employee.email;
            })
            const payload = {
                event: employeeEvent,
                data: {recipientEmail: employeeEmails}
            }
            PublishMessage(this.channel, NOTIFICATION_BINDING_KEY, JSON.stringify(payload))
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async getAllAdminEmailsWithEvent({employeeEvent}){
        try{
            const allAdmin = await this.repository.findAllAdmin();
            const adminEmails = allAdmin.map(function(employee){
                return employee.email;
            })
            const payload = {
                event: employeeEvent,
                data: {recipientEmail: adminEmails}
            }
            PublishMessage(this.channel, NOTIFICATION_BINDING_KEY, JSON.stringify(payload))
        } catch(err){
            throw new APIError('Data Not found', err);
        } 
    }

    async getAllAdminEmails(){
        try{
            const allAdmin = await this.repository.findAllAdmin();
            const adminEmails = allAdmin.map(function(employee){
                return employee.email;
            })
            return adminEmails;
        } catch(err){
            throw new APIError('Data Not found', err);
        } 
    }

    async SubscribeEvents(payload){
 
        payload = JSON.parse(payload);
        
        const { event, data } =  payload;

        const {employeeEvent} = data

        switch(event){
            case 'GET_ALL_EMPLOYEE_EMAIL':
                this.getAllEmployeeEmailsWithEvent({employeeEvent});
                break;
            case 'GET_ALL_ADMIN_EMAIL':
                this.getAllAdminEmailsWithEvent({employeeEvent});
                break;
            default:
                break;
        }
 
    }
}

module.exports = EmployeeService;