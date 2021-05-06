const express = require('express');
const Person = require('../models/Register/PersonUser');
const Association = require('../models/Register/AssociationUser');
const response = require('../helper/response-helper');
const router = express.Router();

module.exports = {

    async registerPerson(req, res) {
        try {
            const person = await Person.create(req.body);
            const lastId = person.sequence_id;
            person.sequence_id = undefined;
            const status = 201;
            const message = 'Usuário adicionado com sucesso!';
            return res.json(response.responseMensage([{ id_user: lastId }], message, status));
        } catch (err) {
            return res.status(400).send({ error: 'Erro no registrado do usuário!' })
        }
    },

    async registerAssociation(req, res) {
        try {
            const association = await Association.create(req.body);

            association.sequence_id = undefined;

            return res.status(201).send({ message: 'Associação adicionada com sucesso!' })
        } catch (err) {
            return res.status(400).send({ error: 'Erro no registrado da associação!' })
        }
    },
}