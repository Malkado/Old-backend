const express = require('express');
const Pix = require('../../models/DonationsInformation/Pix/Pix');
const router = express.Router();
const response = require('../../helper/response-helper');

module.exports = {

    async registerPix(req, res) {
        try {
            const { user_id } = req.body;
            if (await Pix.findOne({ user_id }))
                return res.status(400).send({ error: 'Usuário ja possui chave pix cadastrada, edite para inserir novas chaves' });
            const pix = await Pix.create(req.body);
            return res.status(201).send({ message: 'Chave pix registrada com sucesso!' })
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao registrar chave pix!' })
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

}