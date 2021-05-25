const mongoose = require('../../database/database');

const PersonUserSchema = new mongoose.Schema({
    sequence_id: {
        type: Number,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
        min: 1,
    },
    lastName: {
        type: String,
        require: true,
        min: 1,
    },
    birthDate: {
        type: String,
        require: true,
    },
    CPF_CNPJ: {
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
    },
    image: {
        type: String
    }
});

// Irá criar o valor de id sequencial
PersonUserSchema.pre('save', async function (next) {
    const allSize = await PersonUser.count() + 1;
    this.sequence_id = allSize;
    next();
});

const PersonUser = mongoose.model('PersonUser', PersonUserSchema);

module.exports = PersonUser;