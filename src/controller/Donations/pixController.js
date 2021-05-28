const express = require('express');
const Pix = require('../../models/DonationsInformation/Pix/Pix');
const router = express.Router();
const AuthUser = require('../../models/AuthUser');
const response = require('../../helper/response-helper');

module.exports = {

    async registerPix(req, res) {
        const { random_key, CNPJ_CPF, email, phone, user_id } = req.body;

        try {
            const findUser = await Pix.findOne({ user_id })
            if (findUser) {
                const status = 403;
                const message = 'Usuário ja possui chave pix cadastrada, edite para inserir novas chaves.';
                return res.json(response.responseMensage([], message, status));
            }

            const body = {
                "user_id": user_id,
                "random_key": random_key,
                "CNPJ_CPF": CNPJ_CPF,
                "email": email,
                "phone": phone,
            };

            const createPix = await Pix.create(body);

            if (!createPix) {
                const status = 500;
                const message = 'Falha ao criar a postagem.';
                return res.json(response.responseMensage([], message, status));
            }

            const status = 201;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([], message, status));
        } catch (error) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }

    },

    async getPixKeys(req, res) {
        try {
            const user_id = req.params.id;
            const listPixKeys = await Pix.findOne({ user_id });
            const status = 200;
            const message = 'Usuário adicionado com sucesso!';
            return res.json(response.responseMensage(listPixKeys, message, status));
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao registrar chave pix!' })
        }
    },

    async updatePixKeys(req, res) {
        try {
            const {
                pix_id,
                random_key,
                CNPJ_CPF,
                email,
                phone
            } = req.body;
            const { userId } = req;


            if (!pix_id) {
                const status = 400;
                const message = 'Parâmetros inválidos.';
                return res.json(response.responseMensage([], message, status));
            }
            const checkUser = await AuthUser.findById(userId);
            if (!checkUser) {
                const status = 404;
                const message = 'Usuário não encontrado.';
                return res.json(response.responseMensage([], message, status));
            }


            const bodyupdate = {
                "random_key": random_key,
                "CNPJ_CPF": CNPJ_CPF,
                "email": email,
                "phone": phone,
            };

            const getPixKeys = await Pix.findOneAndUpdate({ pix_id: pix_id }, bodyupdate);
            if (!getPixKeys) {
                const status = 500;
                const message = 'Erro ao tentar atualizar.';
                return res.json(response.responseMensage([], message, status));
            }
            const status = 200;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([], message, status));
        } catch (e) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }
    }

}