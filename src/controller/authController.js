const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const User = require('../models/PersonUser');
const router = express.Router();

// Função que gerencia a criação dos tokens aledatorios
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};
module.exports = {
    async register(req, res) {
        const { email } = req.body;

        try {
            if (await User.findOne({ email }))
                return res.status(400).send({ error: 'User already exist' });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user.id }),
            });
        } catch (err) {
            return res.status(400).send({ error: 'Registration Failed' })
        }
    },

    async authenticate(req,res){
        const { email, password } = req.body;

            const user = await User.findOne({ email }).select('+password');
        
            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }
        
            if (!await bcrypt.compare(password, user.password)) {
                return res.status(400).send({ error: 'Invalid password' });
            }
        
            user.password = undefined;
        
            return res.send({
                user,
                token: generateToken({ id: user.id }),
            });
    }
}