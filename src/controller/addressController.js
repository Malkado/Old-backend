const express = require('express');
const Address = require('../models/Address/Address');
const Person = require('../models/Register/PersonUser');
const Association = require('../models/Register/AssociationUser');
const router = express.Router();

module.exports = {

    async registerAddress(req, res) {
        try {
            const address = await Address.create(req.body);
            address.sequence_id = undefined;

            return res.status(201).send({ error: 'Endereço registrado com sucesso!' })
        } catch (err) {
            return res.status(400).send({ error: 'Erro no registro do endereço!' })
        }
    },

}