const express = require('express');
const Person = require('../../models/Register/PersonUser');
const Association = require('../../models/Register/AssociationUser');
const response = require('../../helper/response-helper');
const router = express.Router();
const Address = require('../../models/Address/Address');

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
            const lastId = association.sequence_id;
            association.sequence_id = undefined;
            const status = 201;
            const message = 'Associação adicionada com sucesso!';
            return res.json(response.responseMensage([{ id_user: lastId }], message, status));
        } catch (err) {
            return res.status(400).send({ error: 'Erro no registrado da Associação!' })
        }
    },

    async removeAccountPerson(req, res) {
        try {
            const person = await Person.findOneAndDelete(req.params.id);
            const status = 200;
            const message = 'Usuário removido com Sucesso';
            return res.json(response.responseMensage([], message, status));
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao remover usuário' })
        }
    },

    async removeAccountAssociation(req, res) {
        try {
            const association = await Association.findOneAndDelete(req.params.id);
            const status = 200;
            const message = 'Associação removido com Sucesso';
            return res.json(response.responseMensage([], message, status));
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao remover Associação' })
        }
    },

    async findAssociationByState(req, res) {
        try {
            var arr = [];
            const state = req.params.state;
            await Address.find({}, function (err, docs) {
                docs.forEach(element => {
                    if (element['state'] == String(state)) {
                        arr.push(element['id_user']);
                    }
                });
                Association.find({ sequence_id: { $in: arr } })
                    .then(docs => {
                        return res.json(docs);
                    })
                    .catch(err => {
                        return res.status(400).send({ error: 'Erro ao retornar a lista de associações' })
                    });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao retornar a lista de associações' })
        }
    }
}