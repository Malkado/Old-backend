const express = require('express');
const Association = require('../models/AssociationUser');
const router = express.Router();

module.exports = {

    async registerAssociation(req, res) {
        try {
            const association = await Association.create(req.body);

            association.sequence_id = undefined;

            return res.status(201).send({ error: 'Associação adicionada com sucesso!' })
        } catch (err) {
            return res.status(400).send({ error: 'Erro no registrado da associação!' })
        }
    },
}