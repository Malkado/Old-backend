const express = require('express');
const Person = require('../models/PersonUser');
const router = express.Router();

module.exports = {

    async registerPerson(req, res) {
        try {
            const person = await Person.create(req.body);

            person.sequence_id = undefined;

            return res.status(201).send({ error: 'Usuário adicionado com sucesso!' })
        } catch (err) {
            return res.status(400).send({ error: 'Erro no registrado do usuário!' })
        }
    },
}