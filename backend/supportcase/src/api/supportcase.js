const SupportCaseService = require('../services/supportcase-service');
const {Authenticate, Authorize } = require('./middlewares/auth');
const {PublishMessage, SubscribeMessage} = require('../utils');
const {MACHINE_BINDING_KEY, NOTIFICATION_BINDING_KEY} = require('../config');

module.exports = (app, channel) => {
    
    const service = new SupportCaseService(channel);
    SubscribeMessage(channel, service, MACHINE_BINDING_KEY);

    app.post('/submit/solution', Authenticate, async (req, res, next) => {
        try{
            const {supportCaseId, solutionType, amount, refundType} = req.body;
            const {_id} = req.user;
            const {data} = await service.submitSolution(_id, {supportCaseId, solutionType, amount, refundType});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.post('/submit/request', Authenticate, async (req, res, next) => {
        try{
            const {supportCaseId, solutionType, amount, refundType, summary} = req.body;
            const {_id} = req.user;
            const {data} = await service.submitRequest(_id, {supportCaseId, solutionType, amount, refundType, summary});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.post('/submit', async (req, res, next) => {
        try{
            const date = new Date();
            const {firstName, lastName, email, phone, machineType, machineNo, amount, description, payType, fasCardNum, creditCardNum} = req.body;
            const {data} = await service.submitSupportCase({firstName, lastName, email, phone, machineType, machineNo, amount, description, date, payType, fasCardNum, creditCardNum});
            return res.send(data);
        } catch (err){
            next(err);
        } 
    })

    app.get('/single', Authenticate, async (req, res, next) => {
        try{
            const {supportCaseId} = req.body;
            const {data} = await service.getSupportCaseById({_id: supportCaseId});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.get('/all', Authenticate, async (req, res, next) => {
        try{
            const {data} = await service.getAllSupportCase();
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.get('/status', Authenticate, async (req, res, next) => {
        try{
            const {status, order} = req.body;
            const {data} = await service.getAllSuppportCaseByStatus(status, order);
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.get('/summary', Authenticate, async (req, res, next) => {
        try{
            const {data} = await service.getSupportCaseSummary();
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.delete('/delete', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {suppportCaseId} = req.body;
            const {data} = await service.removeSupportCase({_id: suppportCaseId});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/request/approve', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {supportCaseId, requestId} = req.body;
            const {data} = await service.approveRequest({supportCaseId, requestId});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/request/deny', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {supportCaseId, requestId} = req.body;
            const {data} = await service.denyRequest({supportCaseId, requestId});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.get('/:id', Authenticate, async (req, res, next) => {
        try{
            const supportCaseId = req.params.id;
            const {data} = await service.getSupportCaseById({_id: supportCaseId});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    
}