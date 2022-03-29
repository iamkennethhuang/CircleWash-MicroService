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
    FASCARD_USERNAME: process.env.FASCARD_USERNAME,
    FASCARD_PASSWORD: process.env.FASCARD_PASSWORD,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: 'CUSTOMER_SUPPORT',
    QUEUE_NAME: 'MACHINE_QUEUE',
    SUPPORT_CASE_BINDING_KEY: 'SUPPORT_CASE_SERVICE',
    EMPLOYEE_BINDING_KEY: 'EMPLOYEE_SERVICE',

}