// database related modules
module.exports = {
    databaseConnection: require('./connection'),
    EmployeeRepository: require('./repository/employee-repository'),
    PendingEmployeeRepository: require('./repository/pending-employee-repository'),
}