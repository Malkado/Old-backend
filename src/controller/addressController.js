const express = require('express');
const Address = require('../models/Address/Address');
const router = express.Router();

module.exports = {

    async registerAddress(req, res) {
        try {
            const address = await Address.create(req.body);
            address.sequence_id = undefined;

            return res.status(201).send({ message: 'Endereço registrado com sucesso!' })
        } catch (err) {
            return res.status(400).send({ error: 'Erro no registro do endereço!' })
        }
    },

}