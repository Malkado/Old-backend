const mongoose = require('../../../database/database');

const PixSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true,
    },
    pix_id: {
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

// Irá criar o valor de id sequencial
PixSchema.pre('save', async function (next) {
    const allSize = await PixDonation.count() + 1;
    this.pix_id = allSize;
    next();
});

const PixDonation = mongoose.model('PixDonation', PixSchema);

module.exports = PixDonation;