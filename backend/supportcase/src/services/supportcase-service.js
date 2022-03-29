const { SupportCaseRepository } = require("../database");
const { FormateData, PublishMessage } = require('../utils');
const { APIError } = require('../utils/app-errors');
const {EMPLOYEE_BINDING_KEY} = require('../config');

class SupportCaseService {
    
    constructor(channel){
        this.channel = channel;
        this.repository = new SupportCaseRepository();
    }

    async submitSupportCase(userInputs){
        try{
            const newSupportCase = await this.repository.createSupportCase(userInputs);
            return FormateData(newSupportCase);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getSupportCaseById({_id}){
        try{
            const supportCase = await this.repository.findSupportCaseById({_id});
            return FormateData(supportCase);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async getAllSupportCase(){
        try{
            const allSupportCase = await this.repository.findAllSupportCase();
            return FormateData(allSupportCase);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async getAllSuppportCaseByStatus(status, order){
        try{
            const allSupportCaseByStatus = await this.repository.findAllSupportCaseByStatus({status, order});
            return FormateData(allSupportCaseByStatus);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getSupportCaseSummary(){
        try{
            const unhandleAmount = await this.repository.findUnhandledCaseAmount();
            const handleAmount = await this.repository.findHandledCaseAmount();
            const totalAmount = await this.repository.findAllSupportCaseAmount();
            const todayAmount = await this.repository.findTodaySupportCaseAmount();
            const weekAmount = await this.repository.findWeekSupportCaseAmount();
            return FormateData({unhandleAmount: unhandleAmount, handleAmount: handleAmount, totalAmount: totalAmount, todayAmount: todayAmount, weekAmount: weekAmount});
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async manageSupportCaseStatus({_id, status}){
        try{
            const preUpdateInfo = await this.repository.updateSupportCaseStatus({_id, status});
            return FormateData(preUpdateInfo);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async removeSupportCase({_id}){
        try{
            const result = await this.repository.deleteSupportCase({_id});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async submitSolution(_id, {supportCaseId, solutionType, amount, refundType}){
        try{
            const newSolution = await this.repository.createSolution({_id, supportCaseId, solutionType, amount, refundType});
            return FormateData(newSolution);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async submitRequest(_id, {supportCaseId, solutionType, amount, refundType, summary}){
        try{
            const newRequest = await this.repository.createRequest({_id, supportCaseId, solutionType, amount, refundType, summary});
            return FormateData(newRequest);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async approveRequest({supportCaseId, requestId}){
        try{
            const check = await this.repository.checkRequestInCase({supportCaseId, requestId});
            if (check) {
                const solution = await this.repository.approveRequest({supportCaseId, requestId});
                return FormateData(solution);
            } else {
                throw new APIError('Data Not found', err);
            }
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async denyRequest({supportCaseId, requestId}){
        try{
            const check = await this.repository.checkRequestInCase({supportCaseId, requestId});
            if (check) {
                const deletedRequest = await this.repository.denyRequest({supportCaseId, requestId});
                return FormateData(deletedRequest);
            } else {
                throw new APIError('Data Not found', err);
            }
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async addCaseAnalyses({supportCaseId, errorData, ganttData}){
        try{
            await this.repository.updateSupportCaseANALYSES({supportCaseId, errorData, ganttData});
            const payload = {
                event: 'GET_ALL_EMPLOYEE_EMAIL',
                data: {employeeEvent: 'NEW_CASE_NOTIFICATION'}
            }
            PublishMessage(this.channel, EMPLOYEE_BINDING_KEY, JSON.stringify(payload));
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async SubscribeEvents(payload){
 
        payload = JSON.parse(payload);

        const { event, data } =  payload;

        const { supportCaseId, errorData, ganttData  } = data;

        switch(event){
            case 'ADD_CASE_ANALYSES':
                this.removeCustomer({supportCaseId, errorData, ganttData});
                break;
            default:
                break;
        }
 
    }
}

module.exports = SupportCaseService;