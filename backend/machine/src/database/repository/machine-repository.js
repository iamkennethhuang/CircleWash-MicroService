const {Machine, DailyRecord, DailyAnalysis, MonthlyAnalysis} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class MachineRepository {

    async createMachine({machineId, machNo, label}){
        try{
            const newMachine = new Machine({
                machineId: machineId,
                machNo: machNo,
                label: label,
                dailyRecords: [],
                dailyAnalyses: [],
                monthlyAnalyses: [],
            })
            await newMachine.save();
            return newMachine;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Machine');
        }
    }

    async findMachineByNo({ machNo }){
        try{
            const machineData = await Machine.findOne({machNo: machNo});
            return machineData;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Machine By Machine Number');
        }
    }

    async findMachineById({ machineId }){
        try{
            const machineData = await Machine.findOne({machineId: machineId});
            return machineData;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Machine By Machine Id');
        }
    }

    async addMachineDailyRecords({machineId, day, month, year, historyRecords}){
        try{

            const selectedMachine = await Machine.findOne({machineId: machineId});

            if (selectedMachine){

                const newDailyRecord = new DailyRecord({
                    day: day,
                    month: month,
                    year: year,
                    machineId: machineId,
                    historyRecords: historyRecords
                })
                await newDailyRecord.save();

                selectedMachine.dailyRecords.push(newDailyRecord);
            }

            return await selectedMachine.save();
            
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Add Machine Daily Records');
        }
    }

    async addMachineDailyAnalyses({machineId, day, month, year, machErrors, lineData}){
        try{
            const selectedMachine = await Machine.findOne({machineId: machineId});

            if (selectedMachine){
                const newDailyAnalysis = new DailyAnalysis({
                    day: day,
                    month: month,
                    year: year,
                    machineId: machineId,
                    machErrors: machErrors,
                    lineData: lineData
                })
                await newDailyAnalysis.save();
                selectedMachine.dailyAnalyses.push(newDailyAnalysis);
            }

            return await selectedMachine.save();
            
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Add Machine Daily Analysis');
        }
    }

    async doesMonthlyAnalysisExists({month, year}){
        MonthlyAnalysis.findOne({month: month, year: year}, (err, doc) => {
            if (err){
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Does Monthly Analysis Exists');
            }
            if (doc){
                return true;
            } else {
                return false;
            }
        })
    }

    async addMachineMonthlyAnalyses({machineId, month, year, pieData}){
        try{
            const selectedMachine = await Machine.findOne({machineId: machineId});;

            if (selectedMachine){
                const newMonthlyAnalysis = new MonthlyAnalysis({
                    month: month,
                    year: year,
                    machineId: machineId,
                    pieData: pieData,
                })
                await newMonthlyAnalysis.save();
                selectedMachine.monthlyAnalyses.push(newMonthlyAnalysis);
            }

            return await selectedMachine.save();
            
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Add Machine Monthly Analysis');
        }
    }

    async updateMachineMonthlyAnalyses({machineId, month, year, pieData}){   
        try{
            const selectedMonthlyAnalyses = await MonthlyAnalysis.findOne({machineId: machineId, month: month, year: year});
            if (selectedMonthlyAnalyses) {
                let oldPieData = selectedMonthlyAnalyses.pieData;
                let {offline, disabled, idle, running, diagnostic, deuplicate, error, firmwareDoesntExist, satellite, reader} = oldPieData;
                let newOffline = offline + pieData.offline;
                let newDisabled = disabled + pieData.disabled;
                let newIdle = idle + pieData.idle;
                let newRunning = running + pieData.running;
                let newDiagnostic = diagnostic + pieData.diagnostic;
                let newDeuplicate = deuplicate + pieData.deuplicate;
                let newError = error + pieData.error;
                let newFirmwareDoesntExist = firmwareDoesntExist + pieData.firmwareDoesntExist;
                let newSatellite = satellite + pieData.satellite;
                let newReader = reader + pieData.reader;
                let newData = {offline: newOffline, disabled: newDisabled, idle: newIdle, running: newRunning, diagnostic: newDiagnostic, deuplicate: newDeuplicate, error: newError, firmwareDoesntExist: newFirmwareDoesntExist, satellite: newSatellite, reader: newReader};
                const oldMonthlyAnalysis = await MonthlyAnalysis.findOneAndUpdate({machineId: machineId, month: month, year: year} , {pieData: newData});
                return oldMonthlyAnalysis;
            }
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Update Machine Monthly Analyses');
        }
    }

    async findDailyRecordsByMonthAfterDay({machineId, day, month, year}){
        try{
            if(day == -1){
                const queryData = await DailyRecord.findOne({machineId: machineId, month: month, year: year}).populate('historyRecords');
                return queryData;
            } else{
                const queryData = await DailyRecord.findOne({machineId: machineId, month: month, year: year, day: { $gte: day}}).populate('historyRecords');
                return queryData;
            }
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find Daily Records By Month After Day');
        }
    }

    async findDailyRecordsByDay({machineId, day, month, year}){
        try{
            const queryData = await DailyRecord.findOne({machineId: machineId, month: month, year: year, day: day}).populate('historyRecords');
            return queryData;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find Daily Records By Day');
        }
    }

    async findMonthAnalyses({machineId, month, year}){
        try{
            const queryData = await MonthlyAnalysis.findOne({machineId: machineId, month: month, year: year});
            return queryData;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find Monthly Analyses');
        }
    }

    async findDayAnalyses({machineId, day, month, year}){
        try{
            const queryData = await DailyAnalysis.findOne({machineId: machineId, day: day, month: month, year: year});
            return queryData;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Find Daily Analyses');
        }
    }
}

module.exports = MachineRepository;