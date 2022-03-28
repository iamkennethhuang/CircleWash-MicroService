const mongoose = require('mongoose');
const { ATLAS_URI } = require('../config');

module.exports = async() => {

    try {
        await mongoose.connect(ATLAS_URI, {
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
