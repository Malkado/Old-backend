const mongoose = require('../database/database');

const PersonUserSchema = new mongoose.Schema({
    sequence_id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    birthDate: {
        type: String,
        require: true,
    },
    CPF_CNPJ: {
        type: String,
        require: true,
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

// Irá encriptar o password
PersonUserSchema.pre('save', async function (next) {
    const allSize = await PersonUser.count() + 1;
    console.log(allSize, 'total do size');
    this.sequence_id = allSize;
    next();
});

const PersonUser = mongoose.model('PersonUser', PersonUserSchema);

module.exports = PersonUser;