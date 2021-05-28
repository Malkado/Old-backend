const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const User = require('../models/AuthUser');
const router = express.Router();
const response = require('../helper/response-helper');

// Função que gerencia a criação dos tokens aledatorios
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};
module.exports = {

    async register(req, res) {
        try {
            const {
                email,
                password,
                id_user,
                type_user
            } = req.body;

            if (!email, !password, !id_user, !type_user) {
                const status = 400;
                const message = 'Parâmetros inválidos.';
                return res.json(response.responseMensage([], message, status));
            }
            const findemail = await User.findOne({ email })
            if (findemail) {
                const status = 403;
                const message = 'User already exist';
                return res.json(response.responseMensage([], message, status));
            }

            const body = {
                "email": email,
                "password": password
            };

            const createUser = await User.create(body);
            createUser.password = undefined;
            if (!createUser) {
                const status = 500;
                const message = 'Erro ao tentar atualizar.';
                return res.json(response.responseMensage([], message, status));
            }

            const returnOptions = {
                createUser,
                token: generateToken({ id: createUser.id }),
            };

            const status = 200;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([returnOptions], message, status));
        } catch (e) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }
    },

    async authenticate(req, res) {
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
    },

    async removeRegister(req, res) {
        try {
            let userRemove;
            const id_user = req.params.id;
            const type_user = req.params.type;
            await User.find({ id_user: id_user, type_user: type_user }, function(err, docs) {
                userRemove = docs;
            });
            await User.findOneAndDelete(userRemove);
            const status = 200;
            const message = 'Usuário removido com Sucesso';
            return res.json(response.responseMensage([], message, status));
        } catch (err) {
            const status = 400;
            const message = 'Erro ao remover Usuário';
            return res.json(response.responseMensage([], message, status));
        }
    },
}