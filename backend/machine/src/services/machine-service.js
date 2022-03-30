const { FormateData, PublishMessage, SubscribeMessage} = require('../utils');
const { FASCARD_USERNAME, FASCARD_PASSWORD, SUPPORT_CASE_BINDING_KEY} = require('../config');
const { MachineRepository} = require("../database");
const { APIError } = require('../utils/app-errors');
const axios = require('axios');

const machIdList = [ 44021, 44022, 44023, 44024, 44025, 44026, 44027, 44028, 44029, 
    44033, 44036, 44037, 44040, 44061, 44062, 44063, 44064, 44065, 44066, 44067, 
    44068, 44069, 44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 
    44079, 44080, 44081, 44082, 44083, 44091, 44092, 44093, 44094, 44095, 44096,
    44097, 44098, 44099, 44100, 44101, 44102, 44103, 44104, 44105, 44106, 44107, 
    44108, 44109, 44110, 44111, 44112, 44113, 44114, 44115, 44116, 44117, 44118, 
    44119, 44120, 44121, 44122, 44123, 44124];

const apiOption = {year: 'numeric', month: 'numeric', day: 'numeric'};

class MachineService{

    constructor(channel){
        this.channel = channel;
        this.repository = new MachineRepository();
    }

    async getDailyRecordsByMonthAfterDay(day, month, year){
        try{
            const data = await this.repository.findDailyRecordsByMonthAfterDay({day, month, year});
            return FormateData(data);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getMonthAnalyses(machineId, month, year){
        try{
            const data = await this.repository.findMonthAnalyses({machineId, month, year});
            return FormateData(data);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getDailyAnalyses(machineId, day, month, year){
        try{
            const data = await this.repository.findDayAnalyses({machineId, day, month, year});
            console.log(data);
            return FormateData(data);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    //should not be called out side of this program 
    async convertMachNoToMachId(machNo){
        let listPosition = machNo - 1;
        return machIdList[listPosition];
    }

    async converUTCToPST({date}){
        const utcms = Number(Date.parse(date));
        const pstms = utcms - 25200000;
        const pst = new Date(pstms);
        return pst;
    }

    //should not be called out side of this program 
    async getYesterdayDate(){
        const todayDate = new Date();
        const date = (todayDate.getDate());
        const month = (todayDate.getMonth());
        const year = (todayDate.getFullYear());
        const today = (new Date(year,month,date));
        const diff = today.getDate() - 1;
        const yesterday = new Date(today.setDate(diff));
        return yesterday;
    }

    //should not be called out side of this program 
    async filterYesterdayRecords({fasCardData}){
        const todayDate = new Date();
        const date = (todayDate.getDate());
        const month = (todayDate.getMonth());
        const year = (todayDate.getFullYear());
        const today = (new Date(year,month,date));
        const diff = today.getDate() - 1;
        const yesterday = new Date(today.setDate(diff));
        //above code get yesterday date
        const sampleDate = yesterday.toLocaleDateString("en-US", apiOption);
        const filteredData = fasCardData.filter(hist => {
            const utcms = Number(Date.parse(hist.StatusTime));
            const pstms = utcms - 25200000;
            const pst = new Date(pstms);
            //above code convert UTC time to PST
            const machDate = new Date(pst).toLocaleDateString("en-US", apiOption);
            if (machDate === sampleDate) {
                return true;
            }
            else{
                return false;
            }
        })
        return filteredData;
    }

    async filterRecords({fasCardData, caseDate}){
        //above code get yesterday date
        const sampleDate = new Date(caseDate).toLocaleDateString("en-US", apiOption);
        const filteredData = fasCardData.filter(hist => {
            const utcms = Number(Date.parse(hist.StatusTime));
            const pstms = utcms - 25200000;
            const pst = new Date(pstms);
            //above code convert UTC time to PST
            const machDate = new Date(pst).toLocaleDateString("en-US", apiOption);
            if (machDate === sampleDate) {
                return true;
            }
            else{
                return false;
            }
        })
        return filteredData;
    }

    //should not be called out side of this program 
    async mapYesterdayRecords({filteredData}){
        const mappedResult = filteredData.map(function(data) {
            const utcms = Number(Date.parse(data.StatusTime));
            const pstms = utcms - 25200000;
            const pstStatus = new Date(pstms);
            const utcmsStart = Number(Date.parse(data.StartTime));
            const pstmsStart = utcmsStart - 25200000;
            const pstStart = new Date(pstmsStart);
            const utcmsFinish = Number(Date.parse(data.FinishTime));
            const pstmsFinish = utcmsFinish - 25200000;
            const pstFinish = new Date(pstmsFinish);
            return {
                machineId: data.MachineID,
                status: data.Status,
                statusText: data.StatusText,
                statusTime: pstStatus,
                startTime: pstStart,
                finishTime: pstFinish,
                mainError: data.MaintError,
                mivMatchError: data.MlvMachError, 
            };
        })
        return mappedResult;
    }

    async addYesterdayDailyRecords({machineId, fasCardData}){
        try{
            const yesterday = await this.getYesterdayDate();
            const yesterdayDate = yesterday.getDate();
            const yesterdayMonth = Number(yesterday.getMonth());
            const yesterdayYear = yesterday.getFullYear();
            const filteredData = await this.filterYesterdayRecords({fasCardData});
            const mappedData = await this.mapYesterdayRecords({filteredData});
            const result = await this.repository.addMachineDailyRecords({machineId, day: yesterdayDate, month: yesterdayMonth, year: yesterdayYear, historyRecords: mappedData});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async analyzeYesterdayError({machineId}){
        try {
            const yesterday = await this.getYesterdayDate();
            const yesterdayDate = yesterday.getDate();
            const yesterdayMonth = yesterday.getMonth();
            const yesterdayYear = yesterday.getFullYear();
            const unAnalyzeData = await this.repository.findDailyRecordsByDay({machineId, day: yesterdayDate, month: yesterdayMonth, year: yesterdayYear});
            const records = unAnalyzeData.historyRecords;
            const filtered = records.filter(record => {
                if((record.mainError == 0) && (record.mivMatchError == 0)){
                    return false;
                } else {
                    return true;
                }
            });
            let machErrors = [];
            const messages = ['Machine OK', 'Unable to communicate with machine', 'Machine leaking water', 'Machine stuck in cycle', 'Machine not filling', 'Machine not draining', 'Machine not heating', 'Machine door problem']; 
            for (let i = 0; i < filtered.length; i++){
                let mainErrorCode = filtered[i].mainError;
                let mivMatchErrorCode = filtered[i].mivMatchError;
                if (mainErrorCode != 0){
                    const mainError = {errorType: "MAINERROR", message: messages[mainErrorCode], time: filtered[i].statusTime};
                    machErrors.push(mainError);
                }
                if (mivMatchErrorCode != 0){
                    const mivError = {errorType: "MIVMatchError", message: messages[mivMatchErrorCode], time: filtered[i].statusTime};
                    machErrors.push(mivError);
                }
            }
            return machErrors;
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async analyzeError({fasCardData}){
        try {
            const filtered = fasCardData.filter(record => {
                if((record.MaintError == 0) && (record.MlvMachError == 0)){
                    return false;
                } else {
                    return true;
                }
            });
            let machErrors = [];
            const messages = ['Machine OK', 'Unable to communicate with machine', 'Machine leaking water', 'Machine stuck in cycle', 'Machine not filling', 'Machine not draining', 'Machine not heating', 'Machine door problem']; 
            const mivmessages = {
                100: "Part or all of config was rejected",
                101: "One or more messages timed out or were rejected",
                999: "Unknown machine problem",
                1000: "Machine code indicates error"
            }
            for (let i = 0; i < filtered.length; i++){
                let mainErrorCode = filtered[i].MaintError;
                let mivMatchErrorCode = filtered[i].MlvMachError;
                const utcms = Number(Date.parse(filtered[i].StatusTime));
                const pstms = utcms - 25200000;
                const pstStatus = new Date(pstms);
                if (mainErrorCode != 0){
                    if(mainErrorCode > 7){
                        message = mivmessages[mainErrorCode];
                        const mainError = {errorType: "MAINERROR", message, time: pstStatus};
                        machErrors.push(mainError);
                    }else {
                        const mainError = {errorType: "MAINERROR", message: messages[mainErrorCode], time: pstStatus};
                        machErrors.push(mainError);
                    }
                }
                if (mivMatchErrorCode != 0){
                    if(mivMatchErrorCode > 7){
                        message = mivmessages[mivMatchErrorCode];
                        const mivError = {errorType: "MIVMatchError", message, time: pstStatus};
                        machErrors.push(mivError);
                    }else {
                        const mivError = {errorType: "MIVMatchError", message: messages[mivMatchErrorCode], time: pstStatus};
                        machErrors.push(mivError);
                    }
                }
            }
            return machErrors;
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async analyzeYesterdayLine({machineId}){
        try {
            const yesterday = await this.getYesterdayDate();
            const yesterdayDate = yesterday.getDate();
            const yesterdayMonth = yesterday.getMonth();
            const yesterdayYear = yesterday.getFullYear();
            const unAnalyzeData = await this.repository.findDailyRecordsByDay({machineId, day: yesterdayDate, month: yesterdayMonth, year: yesterdayYear});
            const records = unAnalyzeData.historyRecords;
            const lineData = records.map(function(d){
                return {
                    code: d.status,
                    message: d.statusText,
                    time: d.statusTime,
                }
            })
            return lineData;
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async analyzeGantt({fasCardData}){
        try {
            const ganttData = fasCardData.map(async (d) => {
                const time = await this.converUTCToPST({date: d.StatusTime});
                const startTime = await this.converUTCToPST({date: d.StartTime});
                const endTime = await this.converUTCToPST({date: d.FinishTime});
                return {
                    code: d.Status,
                    message: d.StatusText,
                    time: time,
                    startTime: startTime,
                    endTime: endTime
                }
            })
            return ganttData;
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async analyzeYesterdayPie({machineId}){
        try {
            const yesterday = await this.getYesterdayDate();
            const yesterdayDate = yesterday.getDate();
            let yesterdayMonth = yesterday.getMonth();
            const yesterdayYear = yesterday.getFullYear();
            const unAnalyzeData = await this.repository.findDailyRecordsByMonthAfterDay({machineId, day: yesterdayDate, month: yesterdayMonth, year: yesterdayYear});
            const records = unAnalyzeData.historyRecords;
            let offline = 0;
            let disabled = 0;
            let idle = 0;
            let running = 0;
            let diagnostic = 0;
            let duplicate = 0;
            let error = 0;
            let firmwareDoesntExist = 0;
            let downloadingToSatellite = 0;
            let downloadingToReader = 0;
            for(let i = 0; i < records.length; i++){
                if (records[i].status === 0){
                    offline++;
                    continue;}
                if (records[i].status === 1){
                    disabled++;
                    continue;}
                if (records[i].status === 2){
                    idle++;
                    continue;}
                if (records[i].status === 3){
                    running++;
                    continue;}
                if (records[i].status === 4){
                    diagnostic++;
                    continue;}
                if (records[i].status === 5){
                    duplicate++;
                    continue;}
                if (records[i].status === 6){
                    error++;
                    continue;}
                if (records[i].status === 100){
                    firmwareDoesntExist++;
                    continue;}
                if (records[i].status === 101){
                    downloadingToSatellite++;
                    continue;}
                if (records[i].status === 102){
                    downloadingToReader++;
                    continue;}}
            return {
                offline: offline,
                disabled: disabled,
                idle: idle,
                running: running,
                diagnostic: diagnostic,
                deuplicate: duplicate,
                error: error,
                firmwareDoesntExist: firmwareDoesntExist, 
                satellite: downloadingToSatellite,
                reader: downloadingToReader
            }
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async addYesterdayDailyAnalysis({machineId, machErrors, lineData}){
        try{
            const yesterday = await this.getYesterdayDate();
            const yesterdayDate = yesterday.getDate();
            const yesterdayMonth = yesterday.getMonth();
            const yesterdayYear = yesterday.getFullYear();
            const result = await this.repository.addMachineDailyAnalyses({machineId, day: yesterdayDate, month: yesterdayMonth, year: yesterdayYear, machErrors, lineData});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async addYesterdayMonthlyAnalysis({machineId, pieData}){
        try {
            const yesterday = await this.getYesterdayDate();
            const yesterdayDate = yesterday.getDate();
            const yesterdayMonth = yesterday.getMonth();
            const yesterdayYear = yesterday.getFullYear();
            if (yesterdayDate == 1){
                const result = await this.repository.addMachineMonthlyAnalyses({machineId, month: yesterdayMonth, year: yesterdayYear, pieData});
                return result;
            } else {
                const result = await this.repository.updateMachineMonthlyAnalyses({machineId, month: yesterdayMonth, year: yesterdayYear, pieData});
                return result;
            }
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async addMachine({allMachineList}){
        try{
            for(let i = 0; i < allMachineList.length; i++){
                let machineId = allMachineList[i].ID;
                let machNo = allMachineList[i].MachNo;
                let label = allMachineList[i].Label;
                await this.repository.createMachine({machineId, machNo, label});
            }
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async analyzeSupportCase({supportCaseId, machineNo, caseDate}){
        try {
            const machineId = await this.convertMachNoToMachId(machineNo);
            await axios({
                method: 'post',
                url: "https://m.fascard.com/api/AuthToken",
                data:{
                    'UserName': `${FASCARD_USERNAME}`,
                    "Password": `${FASCARD_PASSWORD}`
                }
            })
            .then(async (authRes) => {
                let token = authRes.data.Token;
                await axios({
                    method: 'get',
                    headers: { Authorization: `Bearer ${token}` },
                    url: `https://m.fascard.com/api/Machine/${machineId}/History?Limit=1000`,
                })
                .then(async (machRes) => {
                    const filtered = await this.filterRecords({fasCardData: machRes.data, caseDate});
                    const errorData = await this.analyzeError({fasCardData: filtered});
                    const ganttData = await this.analyzeGantt({fasCardData: filtered});
                    const payload = {
                        event: "ADD_CASE_ANALYSES",
                        data: {supportCaseId, errorData, ganttData }
                    }
                    PublishMessage(this.channel, SUPPORT_CASE_BINDING_KEY, JSON.stringify(payload));
                })
                .catch((err) => {
                    throw new APIError('Data Not found', err);
                })
                })
            .catch((err) => {
                throw new APIError('Data Not found', err);
            })
        } catch(err) {
            throw new APIError('Data Not found', err);
        }
        
    }

    async SubscribeEvents(payload){

        payload = JSON.parse(payload);

        const {event, data} = payload;

        const {supportCaseId, machineNo, caseDate} = data;

        switch(event){
            case "ANALYZE_SUPPORT_CASE":
                this.analyzeSupportCase({supportCaseId, machineNo, caseDate}) 
                break;
            default:
                break;
        }
    }
}

module.exports = MachineService;