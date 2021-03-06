const EmployeeService = require('../services/employee-service');
const {Authenticate, Authorize } = require('./middlewares/auth');
const axios = require('axios');
const { APIError, STATUS_CODES } = require('../utils/app-errors');
const {PublishMessage, SubscribeMessage} = require('../utils');
const {EMPLOYEE_BINDING_KEY, NOTIFICATION_BINDING_KEY} = require('../config');

module.exports = (app, channel) => {
    
    const service = new EmployeeService(channel);
    SubscribeMessage(channel, service, EMPLOYEE_BINDING_KEY);

    app.post('/signup', async (req, res, next) => {
        try{
            const {email, password, firstName, lastName} = req.body;
            axios({
                method: 'post',
                data: {
                    UserName: email,
                    Password: password
                },
                url: 'https://m.fascard.com/api/AuthToken/',
            })
            .then((authRes) => {
                axios({
                    method: 'get',
                    headers: { Authorization: `Bearer ${authRes.data.Token}` },
                    url: 'https://m.fascard.com/api/Account/',
                })
                .then(async (accountRes) => {
                    let record = false;
                    let index = -1;
                    for(let i = 0; i < accountRes.data.length; i++){
                        record = record || accountRes.data[i].Employee;
                        if(accountRes.data[i].Employee && (accountRes.data[i].Name === "Circle Wash")){
                            index = i;
                        }
                    }
                    if (record){
                        if(index > -1){
                            const {data} = await service.signUp({email, password, firstName, lastName});
                            return res.send(data);
                        }else{
                            const {data} = await service.signUpPendingEmployee({email, password, firstName, lastName});
                            const adminEmails = await service.getAllAdminEmails();
                            if (data !== null){
                                const payload = {
                                    event: 'NEW_EMPLOYEE_NOTIFICATION',
                                    data: {recipientEmail: adminEmails}
                                }
                                PublishMessage(channel, NOTIFICATION_BINDING_KEY, JSON.stringify(payload));
                            }
                            return res.send(data);
                        }
                    }else{
                        return next(new APIError('unauthorize', STATUS_CODES.UN_AUTHORISED, 'This account is not a fascard account'))
                    }
                })
                .catch((accountError) => {
                    next(accountError)
                })
            })
            .catch((authError) => {
                next(authError)
            })
        }catch (err) {
            next(err);
        }
    })

    app.post('/login', async (req, res, next) => {
        try{
            const {email, password} = req.body;
            const {data} = await service.signIn({email, password});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.get('/profile', Authenticate, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {data} = await service.getEmployee({_id});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.get('/all', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {data} = await service.getAllEmployee();
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/name', Authenticate, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {firstName, lastName} = req.body;
            const {data} = await service.manageName(_id, firstName, lastName);
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/role', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {employeeId, role} = req.body;
            const {data} = await service.manageRole({_id: employeeId, role});
            const payload = {
                event: 'ROLE_CHANGE_NOTIFICATION',
                data: {recipientEmail: data.email}
            }
            PublishMessage(channel, NOTIFICATION_BINDING_KEY, JSON.stringify(payload));
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/password', Authenticate, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {password} = req.body;
            const {data} = await service.managePassword(_id, password);
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.get('/pending/all', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {data} = await service.getAllPendingEmployee();
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/pending/approve', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {pendingId} = req.body;
            const {data} = await service.approvePendingEmployee(_id, pendingId);
            const payload = {
                event: 'NEW_EMPLOYEE_APPROVE_NOTIFICATION',
                data: {recipientEmail: data.email}
            }
            PublishMessage(channel, NOTIFICATION_BINDING_KEY, JSON.stringify(payload));
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/pending/deny', Authenticate, Authorize, async (req, res, next) => {
        try{
            const {pendingId} = req.body;
            const {data} = await service.denyPendingEmployee(pendingId);
            const payload = {
                event: 'NEW_EMPLOYEE_DENY_NOTIFICATION',
                data: {recipientEmail: data.email}
            }
            PublishMessage(channel, NOTIFICATION_BINDING_KEY, JSON.stringify(payload));
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })
}