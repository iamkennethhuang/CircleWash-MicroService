const MachineService = require('../services/machine-service');
const {Authenticate, Authorize } = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new MachineService();

    app.get('/daily/analysis', Authenticate, async (req, res, next) => {
        try{
            const {machNo, day, month, year} = req.body;
            const machineId = await service.convertMachNoToMachId(machNo);
            const dailyAnalysis = await service.getDailyAnalyses(machineId, day, month, year);
            return res.send(dailyAnalysis);
        }catch (err) {
            next(err);
        }
    })

    app.get('/monthly/analysis', Authenticate, async (req, res, next) => {
        try{
            const {machNo, month, year} = req.body;
            const machineId = await service.convertMachNoToMachId(machNo);
            const monthlyAnalysis = await service.getMonthAnalyses(machineId, month, year);
            return res.send(monthlyAnalysis);
        }catch (err) {
            next(err);
        }
    })

    app.get('/monthly/analysis/all', Authenticate, async (req, res, next) => {
        try{
            const allMonthlyAnalyses = [];
            const {month, year} = req.body;
            for (let i = 1; i < 71; i++){
                const machineId = await service.convertMachNoToMachId(i);
                const monthlyAnalysis = await service.getMonthAnalyses(machineId, month, year);
                allMonthlyAnalyses.push(monthlyAnalysis);
            }
            return res.send(allMonthlyAnalyses);
        }catch (err) {
            next(err);
        }
    })
}