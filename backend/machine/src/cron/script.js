const axios = require('axios');
const MachineService = require('../services/machine-service');
const cron = require("node-cron");
const { FASCARD_USERNAME, FASCARD_PASSWORD } = require('../config');

const machCode = [ 44021, 44022, 44023, 44024, 44025, 44026, 44027, 44028, 44029, 
    44033, 44036, 44037, 44040, 44061, 44062, 44063, 44064, 44065, 44066, 44067, 
    44068, 44069, 44070, 44071, 44072, 44073, 44074, 44075, 44076, 44077, 44078, 
    44079, 44080, 44081, 44082, 44083, 44091, 44092, 44093, 44094, 44095, 44096,
    44097, 44098, 44099, 44100, 44101, 44102, 44103, 44104, 44105, 44106, 44107, 
    44108, 44109, 44110, 44111, 44112, 44113, 44114, 44115, 44116, 44117, 44118, 
    44119, 44120, 44121, 44122, 44123, 44124];

const service = new MachineService();

//call once to initialize machine database
module.exports.CronJobInsertMachine = async () => {
    console.log('Setting Up Machine Database...');
    await axios({
        method: 'post',
        url: "https://m.fascard.com/api/AuthToken",
        data:{
            'UserName': `${FASCARD_USERNAME}`,
            "Password": `${FASCARD_PASSWORD}`
        }
    })
    .then((authRes) => {
        token = authRes.data.Token;
        axios({
            method: 'get',
            headers: { Authorization: `Bearer ${token}` },
            url: `https://m.fascard.com/api/Machine?LocationID=1837`,
        })
        .then(async (machRes) => {
            const allMachineList = machRes.data;
            await service.addMachine({allMachineList});
            console.log("CronJobInsertMachine finished");
        })
        .catch((err) => {
            console.log("failed at getting machine data", err);
        })
    })
    .catch((err) => {
        console.log("failed at getting fascard login", err);
    })
}

module.exports.CronJobRecriveMahineRecordsAndAnalyze = () => {
    cron.schedule("37 00 * * *", async () => {
        console.log('Scheduler running...');
        await axios({
            method: 'post',
            url: "https://m.fascard.com/api/AuthToken",
            data:{
                'UserName': `${FASCARD_USERNAME}`,
                "Password": `${FASCARD_PASSWORD}`
            }
        })
        .then(async (authRes) => {
            token = authRes.data.Token;
            for(let i = 0; i < machCode.length; i++){
                await axios({
                    method: 'get',
                    headers: { Authorization: `Bearer ${token}` },
                    url: `https://m.fascard.com/api/Machine/${machCode[i]}/History?Limit=1000`,
                })
                .then(async (machRes) => {
                    const allMachineList = machRes.data;
                    await service.addYesterdayDailyRecords({machineId: machCode[i], fasCardData: allMachineList});
                    let machErrors = await service.analyzeYesterdayError({machineId: machCode[i]});
                    if (machErrors === undefined || machErrors === null){
                        machErrors = [];
                    }
                    let lineData = await service.analyzeYesterdayLine({machineId: machCode[i]});
                    if (lineData === undefined || lineData === null){
                        lineData = [];
                    }
                    await service.addYesterdayDailyAnalysis({machineId: machCode[i], machErrors, lineData});
                    let pieData = await service.analyzeYesterdayPie({machineId: machCode[i]});               
                    if (pieData === undefined || pieData === null){
                        pieData = {offline: 0, disabled: 0, idle: 0, running: 0, diagnostic: 0, deuplicate: 0, error: 0, firmwareDoesntExist: 0, satellite: 0, reader: 0};
                    }
                    await service.addYesterdayMonthlyAnalysis({machineId: machCode[i], pieData});
                    console.log(`CronJobRecriveMahineRecordsAndAnalyze finished machine ${i}`);
                })
                .catch((err) => {
                    console.log("failed at getting machine data", err);
                })
            }
            console.log('job finish')
        })
        .catch((err) => {
            console.log("failed at getting fascard login", err);
        })
    })    
}