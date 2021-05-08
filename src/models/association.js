const mongoose = require('../database/database');

const AssociationSchema = new mongoose.Schema({
    sequence_id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    CNPJ: {
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
AssociationSchema.pre('save', async function (next) {
    const allSize = await Association.count() + 1;
    console.log(allSize, 'total do size');
    this.sequence_id = allSize;
    next();
});

const Association = mongoose.model('Association', AssociationSchema);

module.exports = AssociationSchema;