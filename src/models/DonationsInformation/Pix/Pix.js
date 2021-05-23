const mongoose = require('../../../database/database');

const PixSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
    },
    random_key: {
        type: String,
        unique: true,
        min: 1,
    },
    CNPJ_CPF: {
        type: String,
        unique: true,
        min: 11,
        max: 14,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
    }
});

const PixDonation = mongoose.model('PixDonation', PixSchema);

module.exports = PixDonation;