const mongoose = require('../database/database');
const bcrypt = require('bcryptjs')

const validationAccontSchema = new mongoose.Schema({
    id_user: {
        type: String,
        require: true,
    },
    type: {
        type: Number,
        require: true,
    },
    code: {
        type: String,
        require: true,
        lowercase: true
    },
    status: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

});

// // Irá encriptar o password
validationAccontSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.code, 10);
    this.code = hash;
    next();
});

const validationAccont = mongoose.model('ValidationAccont', validationAccontSchema);

module.exports = validationAccont;