const { NotificationRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError } = require('../utils/app-errors');
const {SENDGRID_API_KEY, CARE_EMAIL} = require('../config');
const client = require('@sendgrid/mail');

client.setApiKey(SENDGRID_API_KEY);

class NotificationService{

    constructor(){
        this.repository = new NotificationRepository();
    }

    async sendNewSupportCaseNotification(userInputs){

        const subject = 'New Support Case Notification';
        const information = 'There is a new support case submitted.';
        const authorEmail = CARE_EMAIL;
        const {recipientEmail} = userInputs;
        const sentTime = new Date();

        try{
            await client.send({
                to: recipientEmail,// all employee
                from: {
                    email: authorEmail,
                    name: "Circle Wash Notification"
                },
                subject: subject,
                html: `<h1>${information}</h1>`
            })
            await this.repository.createNotification({subject, information, authorEmail, recipientEmail, sentTime})
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async sendAccountAppoveNotification(userInputs){
        const subject = 'Account Approve Notification';
        const {recipientEmail} = userInputs;
        const information = 'Your account have been approved, please sign in with your email and password.';
        const authorEmail = '';
        const sentTime = new Date();

        try{
            await client.send({
                to: recipientEmail,// all employee
                from: {
                    email: authorEmail,
                    name: "Circle Wash Notification"
                },
                subject: subject,
                html: `<h1>${information}</h1>`
            })
            await this.repository.createNotification({subject, information, authorEmail, recipientEmail, sentTime})
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async sendAccountDenyNotification(userInputs){
        const subject = 'Account Deny Notification';
        const {recipientEmail} = userInputs;
        const information = 'Your account have been Denied';
        const authorEmail = '';
        const sentTime = new Date();

        try{
            await client.send({
                to: recipientEmail,// all employee
                from: {
                    email: authorEmail,
                    name: "Circle Wash Notification"
                },
                subject: subject,
                html: `<h1>${information}</h1>`
            })
            await this.repository.createNotification({subject, information, authorEmail, recipientEmail, sentTime})
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async sendRoleChangeNotification(userInputs){
        const subject = 'Role Updated Notification';
        const {recipientEmail} = userInputs;
        const information = 'Your account role have been updated';
        const authorEmail = CARE_EMAIL;
        const sentTime = new Date();

        try{
            await client.send({
                to: recipientEmail,// all employee
                from: {
                    email: authorEmail,
                    name: "Circle Wash Notification"
                },
                subject: subject,
                html: `<h1>${information}</h1>`
            })
            await this.repository.createNotification({subject, information, authorEmail, recipientEmail, sentTime})
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async sendNewPendingAccountNotification(userInputs){
        const subject = 'New Pending Account Notification';
        const {recipientEmail} = userInputs; //all admin account
        const information = 'There is a new account that is waiting for approve';
        const authorEmail = '';
        const sentTime = new Date();

        try{
            await client.send({
                to: recipientEmail,// all employee
                from: {
                    email: authorEmail,
                    name: "Circle Wash Notification"
                },
                subject: subject,
                html: `<h1>${information}</h1>`
            })
            await this.repository.createNotification({subject, information, authorEmail, recipientEmail, sentTime})
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async sendNewPendingCaseRequestNotification(userInputs){
        const subject = 'New Pending Case Request Notification';
        const {recipientEmail} = userInputs; // all admin account
        const information = 'There is a new Case request submitted by employee waiting for refund approve';
        const authorEmail = CARE_EMAIL;
        const sentTime = new Date();

        try{
            await client.send({
                to: recipientEmail,// all employee
                from: {
                    email: authorEmail,
                    name: "Circle Wash Notification"
                },
                subject: subject,
                html: `<h1>${information}</h1>`
            })
            await this.repository.createNotification({subject, information, authorEmail, recipientEmail, sentTime})
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async SubscribeEvents(payload){
 
        payload = JSON.parse(payload);
        
        const { event, data } =  payload;

        const { recipientEmail} = data; 


        switch(event){
            case 'NEW_CASE_NOTIFICATION':
                this.sendNewSupportCaseNotification({recipientEmail});
                break;
            case 'NEW_EMPLOYEE_APPROVE_NOTIFICATION':
                this.sendAccountAppoveNotification({recipientEmail});
                break;
            case 'NEW_EMPLOYEE_DENY_NOTIFICATION':
                this.sendAccountDenyNotification({recipientEmail});
                break;
            case 'ROLE_CHANGE_NOTIFICATION':
                this.sendRoleChangeNotification({recipientEmail});
                break;
            case 'NEW_EMPLOYEE_NOTIFICATION':
                this.sendNewPendingAccountNotification({recipientEmail});
                break;
            case 'NEW_REQUEST_NOTIFICATION':
                this.sendNewPendingCaseRequestNotification({recipientEmail});
                break;
            default:
                break;
        }
 
    }
}

module.exports = NotificationService;