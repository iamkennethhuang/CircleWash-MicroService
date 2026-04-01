const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

module.exports = async() => {

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB database connection established successfully");
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
 
};
