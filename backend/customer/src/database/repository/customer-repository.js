const {Customer, Address} = require('../models');
const { APIError, STATUS_CODES } = require('../../utils/app-errors');

class CustomerRepository {

    async createCustomer({email, password, firstName, lastName, salt}){
        try{
            const newCustomer = new Customer({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                salt: salt
            })
            const newCustomerDate = await newCustomer.save();
            return newCustomerDate;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer');
        }
    }

    async createAddress({_id, name, street, city, zip}){
        try{
            const profile = await Customer.findById(_id);

            if (profile){

                const newAddress = new Address({
                    name: name,
                    street: street,
                    city: city,
                    zip: zip
                })

                await newAddress.save();

                profile.addresses.push(newAddress);
            }

            return await profile.save();
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Create Address');
        }
    }

    async deleteAddress({_id, addressId}){

        try{
            const address = await Address.findById(addressId);
            const profile = await Customer.findById(_id).populate('addresses');

            if(address && profile){
                await Address.findByIdAndRemove(addressId);
                profile.addresses.pull({_id: addressId});
            }
            return await profile.save();
            
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Remove Address');
        }
    }

    async findCustomer({ email }){
        try{
            const profile = await Customer.findOne({email: email});
            return profile;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Customer');
        }
    }

    async isCustomerEmail({email}){
        Customer.findOne({email: email}, (err, doc) => {
            if (err) {
                throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on isCustomerEmail');
            }
            if (doc) {
                return true;
            }else{
                return false;
            }
        });
    }

    async findCustomerById({ _id }){
        try{
            const customerInfo = await Customer.findById(_id).populate('addresses');
            return customerInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Finding Customer');
        }
    }

    async updateCustomerName({ _id, firstName, lastName}){
        try{
            const customerOldInfo = await Customer.findByIdAndUpdate(_id , {firstName: firstName, lastName: lastName});
            return customerOldInfo;
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Updating Customer Name');
        }
    }

    async updateCustomerPhone({ _id, phone}){
        try{
            const customerOldInfo = await Customer.findByIdAndUpdate( _id, {phone:phone});
            return customerOldInfo
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Updating Customer Phone');
        }
    }   

    async deleteCustomer({ _id}){
        try{
            const removedCustomer = await Customer.findByIdAndRemove(_id);
            return removedCustomer
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Error on Removing Customer');
        }
    }   
}

module.exports = CustomerRepository;