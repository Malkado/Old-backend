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
            const { state } = req.body;
            await Address.find({}, function (err, docs) {
                docs.forEach(element => {
                    if (element['state'] == state) {
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
    },
    // sequence_id: {
    //     type: Number,
    //     require: true,
    // },
    // fantasy_name: {
    //     type: String,
    //     require: true,
    //     min: 1,
    // },
    // CNPJ: {
    //     type: String,
    //     require: true,
    //     unique: true,
    //     min: 11,
    //     max: 14,
    // },
    // phone_1: {
    //     type: String,
    //     require: true,
    // },
    // phone_2: {
    //     type: String,
    //     require: true,
    // }

    async updateAccountAssociation(req, res) {
        const { userId } = req;

        const { id, fantasy_name, cnpj, phone_1, phone_2 } = req.body;
        try {
            if ((!id || !fantasy_name || !cnpj || !phone_1)) {
                const status = 400;
                const message = 'Parâmetros inválidos.';
                return res.json(response.responseMensage([], message, status));
            }
            const user = await AuthModel.findById(userId);
            if (!user) {
                const status = 404;
                const message = 'Usuário não encontrado.';
                return res.json(response.responseMensage([], message, status));
            }

            const findAssociation = await Association.find().where({ sequence_id: id });
            if (!findAssociation || findAssociation.length == 0) {
                const status = 404;
                const message = 'Associação não encontrada.';
                return res.json(response.responseMensage([], message, status));
            }

            let body;
            if (phone_2) {
                body = {
                    'sequence_id': id,
                    'fantasy_name': fantasy_name,
                    'CNPJ': cnpj,
                    'phone_1': phone_1,
                    'phone_2': phone_2
                };

            } else {
                body = {
                    'sequence_id': id,
                    'fantasy_name': fantasy_name,
                    'CNPJ': cnpj,
                    'phone_1': phone_1
                };
            }

        } catch (error) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }

    },

    async updateAccountPerson(req, res) {

    }


}