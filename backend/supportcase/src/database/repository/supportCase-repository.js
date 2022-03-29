const {Request, Solution, SupportCase, SupportInfo} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class SupportCaseRepository {

    async createSupportCase(info){
        const {firstName, lastName, email, phone, machineType, machineNo, amount, description, date, payType, fasCardNum, creditCardNum} = info;

        try{
            const newSupportInfo = new SupportInfo({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                machineType: machineType,
                machineNo: machineNo,
                amount: amount,
                description: description,
                date: date,
                payType: payType,
                fasCardNum: fasCardNum,
                creditCardNum: creditCardNum
            })
            const newSupportInfoData = await newSupportInfo.save();
            const newSupportCase = new SupportCase({
                open: true,
                supportInfo: newSupportInfo,
                supportInfoId: newSupportInfoData._id,
                status: 'UNHANDLED',
                errorData: [],
                ganttData: []
            })
            const newSupportCaseData = await newSupportCase.save();
            return newSupportCaseData;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Support Case');
        }
    }

    async findSupportCaseById({ _id }){
        try{
            const supportcase = await SupportCase.findById(_id).populate('supportInfo').populate('request');
            return supportcase;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Support Case');
        }
    }

    async findAllSupportCase(){
        try{
            const allSupportCase = await SupportCase.find({});
            return allSupportCase;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding All Support Case');
        }
    }

    async findAllSupportCaseByStatus({ status, order}){
        try{
            const allSupportCaseByStatus = await SupportCase.find({status: status}).sort({createdAt: order})
            return allSupportCaseByStatus;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding All Support Case By Status');
        }
    }

    async findUnhandledCaseAmount(){
        try{
            const unhandleSupportCaseAmount = await SupportCase.find({status: 'UNHANDLED'}).count();
            return unhandleSupportCaseAmount;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Unhandled Case Amount');
        }
    }

    async findHandledCaseAmount(){
        try{
            const handleSupportCaseAmount = await SupportCase.find({status: 'HANDLED'}).count();
            return handleSupportCaseAmount;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Handled Support Case Amount');
        }
    }

    async findAllSupportCaseAmount(){
        try{
            const allSupportCaseAmount = await SupportCase.find({}).count();
            return allSupportCaseAmount;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding All Support Case Amount');
        }
    }

    async findTodaySupportCaseAmount(){
        const todayDate = new Date();
        const month = (todayDate.getMonth());
        const date =(todayDate.getDate());
        const year = (todayDate.getFullYear());
        const today = (new Date(year,month,date));
        try{
            const allTodaySupportCaseAmount = await SupportCase.find({date: { $gte: today}}).count();
            return allTodaySupportCaseAmount;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding All Today Support Case Amount');
        }
    }

    async findWeekSupportCaseAmount(){
        const todayDate = new Date();
        const date = (todayDate.getDate());
        const day = (todayDate.getDay());
        const month = (todayDate.getMonth());
        const year = (todayDate.getFullYear());
        const today = (new Date(year,month,date));
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(today.setDate(diff));
        try{
            const allWeekSupportCaseAmount = await SupportCase.find({date: { $gte: monday}}).count();
            return allWeekSupportCaseAmount;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding All Week Support Case Amount');
        }
    }

    async updateSupportCaseStatus({_id, status}){
        try{
            const preUpdateInfo = await SupportCase.findByIdAndUpdate(_id, {status: status});
            return preUpdateInfo;
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Update Support Case Status');
        }
    }

    async deleteSupportCase({_id}){
        try{
            const deleteCase = await SupportCase.findByIdAndDelete(_id);
            if ((deleteCase.solution) && (deleteCase.solution == null)){
                await Solution.findByIdAndDelete(deleteCase.solution);
            }
            if ((deleteCase.request) && (deleteCase.request == null)){
                await Request.findByIdAndDelete(deleteCase.request);
            }
            return deleteCase;
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Delete Support Case');
        }
    }

    async createSolution({_id, supportCaseId, solutionType, amount, refundType}){
        try{
            const solutionInfo = new Solution({
                solutionType: solutionType,
                amount: amount,
                refundType: refundType,
                staffId: _id
            })
            const newSolution = await solutionInfo.save();
            await SupportCase.findByIdAndUpdate(supportCaseId, {solution: solutionInfo, status: 'HANDLED'});
            return newSolution;
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Create Support Case Solution');
        }
    }

    async createRequest({_id, supportCaseId, solutionType, amount, refundType, summary}){
        try{
            const requestInfo = new Request({
                solutionType: solutionType,
                amount: amount,
                refundType: refundType,
                staffId: _id,
                summary: summary,
                approve: false
            })
            const newRequest = await requestInfo.save();
            await SupportCase.findByIdAndUpdate(supportCaseId, {request: requestInfo, status: 'PENDING'});
            return newRequest;
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Create Support Case Request');
        }
    }

    async checkRequestInCase({supportCaseId, requestId}){
        try{
            const supportcase = await SupportCase.findById(supportCaseId);
            if (supportcase.request){
                if(supportcase.request == requestId){
                    return true;
                } else {
                    false;
                }
            }
            else {
                return false;
            }
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Check Support Case Request');
        }
    }

    async approveRequest({supportCaseId, requestId}){
        try{
            await Request.findByIdAndUpdate(requestId, {approve: true});
            const request = await Request.findById(requestId);
            const solutionInfo = new Solution({
                solutionType: request.solutionType,
                amount: request.amount,
                refundType: request.refundType,
                staffId: request.staffId
            })
            const solution = await solutionInfo.save();
            await SupportCase.findByIdAndUpdate(supportCaseId, {solution: solutionInfo, status: 'HANDLED'});
            return solution;
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Approve Support Case Request');
        }
    }

    async denyRequest({supportCaseId, requestId}){
        try{
            const deletedRequest = await Request.findByIdAndDelete(requestId);
            await SupportCase.findByIdAndUpdate(supportCaseId, {status: 'UNHANDLED', request: null});
            return deletedRequest;
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Deny Support Case Request');
        }
    }

    async updateSupportCaseANALYSES({supportCaseId, errorData, ganttData}){
        try{
            const preUpdateInfo = await SupportCase.findByIdAndUpdate(supportCaseId, {errorData: errorData, ganttData: ganttData});
            return preUpdateInfo;
        } catch (err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Update Support Case Status');
        }
    }
}

module.exports = SupportCaseRepository;