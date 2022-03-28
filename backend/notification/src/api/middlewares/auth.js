const { ValidateSignature } = require('../../utils');

module.exports.Authenticate = async (req, res, next) => {
    const isAuthorized = await ValidateSignature(req);

    if (isAuthorized){
        return next();
    }
    return res.status(403).json({message: 'Not Authenticated'});
    
}

module.exports.Authorize = async (req, res, next) => {
    const {role} = req.user;

    if (role === 'admin'){
        return next();
    }
    return res.status(403).json({message: 'Not Authorized'});
    
}