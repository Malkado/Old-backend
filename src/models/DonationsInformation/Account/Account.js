const mongoose = require('../../../database/database');

const AccountSchema = new mongoose.Schema({
    account_id: {
        type: Number,
    },
    user_id: {
        type: Number,
    },
    type_account: {
        type: Number
    },
    name: {
        type: String,
    },
    CNPJ_CPF: {
        type: String,
        min: 11,
        max: 14,
    },
    bank: {
        type: String,
    },
    agency: {
        type: String,
    },
    number_account: {
        type: String,
        unique: true,
    },
});

// Irá criar o valor de id sequencial
AccountSchema.pre('save', async function (next) {
    const allSize = await AccountDonation.count() + 1;
    this.account_id = allSize;
    next();
});

const AccountDonation = mongoose.model('AccountDonation', AccountSchema);

module.exports = AccountDonation;