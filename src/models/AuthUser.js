const mongoose = require('../database/database');
const bcrypt = require('bcryptjs')

const AuthUserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

// Irá encriptar o password
AuthUserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const AuthUser = mongoose.model('AuthUser', AuthUserSchema);

module.exports = AuthUser;