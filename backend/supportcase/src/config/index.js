const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== 'prod'){
    const configFile =  `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path:  configFile });
}else{
    dotEnv.config();
}

module.exports = {

    PORT: process.env.PORT,
    APP_SECRET: process.env.APP_SECRET,
    ATLAS_URI: process.env.ATLAS_URI,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: "CUSTOMER_SUPPORT",
    QUEUE_NAME: "SUPPORT_CASE_QUEUE",
    MACHINE_BINDING_KEY: 'MACHINE_SERVICE',
    EMPLOYEE_BINDING_KEY: 'EMPLOYEE_SERVICE',
    NOTIFICATION_BINDING_KEY: 'NOTIFICATION_SERVICE',
    SUPPORT_CASE_BINDING_KEY: 'SUPPORT_CASE_SERVICE',

}