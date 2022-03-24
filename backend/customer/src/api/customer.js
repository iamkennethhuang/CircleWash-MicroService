const CustomerService = require('../services/customer-service');
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new CustomerService();

    app.post('/signup', async (req, res, next) => {
        try{
            const {email, password, firstName, lastName} = req.body;
            const {data} = await service.signUp({email, password, firstName, lastName});
            return res.send(data);
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

    app.get('/profile', UserAuth, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {data} = await service.getProfile(_id);
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/name', UserAuth, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {firstName, lastName} = req.body;
            const {data} = await service.manageName(_id, firstName, lastName);
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/phone', UserAuth, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {phone} = req.body;
            const {data} = await service.managePhone(_id, phone);
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/address/add', UserAuth, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {name, street, city, zip} = req.body;
            const {data} = await service.addNewAddress(_id, {name, street, city, zip});
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })

    app.put('/address/remove', UserAuth, async (req, res, next) => {
        try{
            const {_id} = req.user;
            const {addressId} = req.body;
            const {data} = await service.removeAddress(_id, addressId);
            return res.send(data);
        } catch (err) {
            next(err);
        }
    })
}