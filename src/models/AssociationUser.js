const mongoose = require('../database/database');

const AssociationUserSchema = new mongoose.Schema({
    sequence_id: {
        type: Number,
        require: true,
    },
    fantasy_name: {
        type: String,
        require: true,
        min: 1,
    },
    CNPJ: {
        type: String,
        require: true,
        unique: true,
        min: 11,
        max: 14,
    },
    phone_1: {
        type: String,
        require: true,
    },
    phone_2: {
        type: String,
        require: true,
    }
});

// Irá criar o valor de id sequencial
AssociationUserSchema.pre('save', async function (next) {
    const allSize = await AssociationUser.count() + 1;
    this.sequence_id = allSize;
    next();
});

const AssociationUser = mongoose.model('AssociationUser', AssociationUserSchema);

module.exports = AssociationUser;