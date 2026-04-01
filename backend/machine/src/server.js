const express = require('express');
const { PORT } = require('./config');
const {databaseConnection} = require ('./database');
const expressApp = require ('./express-app');
const { CreateChannel } = require('./utils');

const StartServer = async () => {
    const app = express();

    try {
        await databaseConnection();

        const channel = await CreateChannel();

        await expressApp(app, channel);

        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`);
        })
        .on('error', (err) => { // take care of the uncaught error
            console.log(err);
            process.exit(1);
        });
    } catch (err) {
        console.error('Failed to start machine service:', err.message || err);
        console.error(err.stack || err);
        console.log('Retrying startup in 5 seconds...');
        setTimeout(StartServer, 5000);
    }
}

StartServer();