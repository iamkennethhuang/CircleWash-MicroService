const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError } = require('../utils/app-errors');

class CustomerService {
    constructor(){
        this.repository = new CustomerRepository();
    }

    async signIn(userInputs){

        const {email, password} = userInputs; 

        try{
            const existingCustomer = await this.repository.findCustomer({email});
            if(existingCustomer){
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token});
                }
            }
            return FormateData(null);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async signUp(userInputs){
        const {email, password, firstName, lastName} = userInputs;

        try{
            const existingCustomer = await this.repository.isCustomerEmail({email});

            if(!existingCustomer){
                let salt = await GenerateSalt();
                let userPassword = await GeneratePassword(password, salt);
                const newCustomer = await this.repository.createCustomer({ email, password: userPassword, firstName, lastName, salt});
                return FormateData({id: newCustomer._id});
            }
            return FormateData(null);
        } catch(err){
            throw new APIError('Data Not found', err);
        }
    }

    async addNewAddress(_id, userInput){

        const {name, street, city, zip} = userInput;

        try{
            const addressResult = await this.repository.createAddress({_id, name, street, city, zip});
            return FormateData(addressResult);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async removeAddress(_id, addressId){
        try{
            const resultInfo = await this.repository.deleteAddress({_id, addressId});
            return FormateData(resultInfo);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async getProfile(_id){
        try{
            const customer = await this.repository.findCustomerById({_id});
            return FormateData(customer);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async manageName(_id, firstName, lastName){
        try{
            const result = await this.repository.updateCustomerName({_id, firstName, lastName});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }

    async managePhone(_id, phone){
        try{
            const result = await this.repository.updateCustomerPhone({_id, phone});
            return FormateData(result);
        } catch (err) {
            throw new APIError('Data Not found', err);
        }
    }
}

module.exports = CustomerService;