const mongoose = require('../../database/database');

const AddressSchema = new mongoose.Schema({
    sequence_id: {
        type: Number,
        require: true,
    },
    id_user: {
        type: Number,
        require: true,
    },
    type_user: {
        type: Number,
        require: true,
    },
    street: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    zipcode: {
        type: Number,
        require: true,
        min: 8,
    },
    number: {
        type: Number,
        require: true,
    },
    neighborhood: {
        type: String,
        require: true,
    },
    uf: {
        type: String,
        require: true,
        min: 2,
    },
    country: {
        type: String,
        require: true,
    },
    complement: {
        type: String,
    }
});


// Irá criar o valor de id sequencial
AddressSchema.pre('save', async function (next) {
    const allSize = await Address.count() + 1;
    this.sequence_id = allSize;
    next();
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;