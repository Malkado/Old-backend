const express = require('express');
const Person = require('../../models/Register/PersonUser');
const Association = require('../../models/Register/AssociationUser');
const response = require('../../helper/response-helper');
const router = express.Router();
const Address = require('../../models/Address/Address');
const AuthModel = require('../../models/AuthUser');
const AssiciationPost = require('../../models/Posts/AssiciationPost');
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
    },

    async updateAccountAssociation(req, res) {
        const { userId } = req;
        const { id, fantasy_name, cnpj, phone_1, phone_2, image } = req.body;
        try {
            if (!id || !fantasy_name || !cnpj || !phone_1) {
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

            const body = {
                'fantasy_name': fantasy_name,
                'CNPJ': cnpj,
                'phone_1': phone_1
            };
            phone_2 ? body['phone_2'] = phone_2 : null;
            image ? body['image'] = image : null;

            const update_Association = await Association.updateOne({ sequence_id: id });
            if (!update_Association) {
                const status = 500;
                const message = 'Falha ao atualizar os dados.';
                return res.json(response.responseMensage([], message, status));
            }
            const update_publications = await AssiciationPost.updateMany({ association_sequence_id: id }, { association_name: fantasy_name });
            if (!update_publications) {
                const status = 500;
                const message = 'Falha ao atualizar as publicações.';
                return res.json(response.responseMensage([], message, status));
            }
            const status = 200;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([], message, status));
        } catch (error) {
            console.error(error)
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }

    },

    async updateAccountPerson(req, res) {
        const { userId } = req;
        const { id, firstName, lastName, birthDate, cpf_cnpj, phone_1, phone_2, image } = req.body;
        try {
            if (!id || !firstName || !lastName || !birthDate || !cpf_cnpj || !phone_1) {
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

            const findUser = await Person.find().where({ sequence_id: id });
            if (!findUser || findUser.length == 0) {
                const status = 404;
                const message = 'Usuário não encontrado.';
                return res.json(response.responseMensage([], message, status));
            }

            const body = {
                'firstName': firstName,
                'lastName': lastName,
                'birthDate': birthDate,
                'CPF_CNPJ': cpf_cnpj,
                'phone_1': phone_1
            };
            phone_2 ? body['phone_2'] = phone_2 : null;
            image ? body['image'] = image : null;

            const updatePerson = await Person.updateOne({ _id: findUser[0]['_id'] }, body);
            if (!updatePerson) {
                const status = 500;
                const message = 'Falha ao atualizar os dados.';
                return res.json(response.responseMensage([], message, status));
            }

            const status = 200;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([], message, status));
        } catch (error) {
            console.error(error)
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }

    }


}



