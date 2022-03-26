const MachineService = require('./src/services/machine-service');
const service = new MachineService();
service.getYesterdayDate().then((result) => {
    console.log(result.getDate(), result.getMonth(), result.getFullYear());
    const today = new Date();
    console.log(today.getDate(), today.getMonth(), today.getFullYear());
})

