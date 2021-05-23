const express = require('express');
const Address = require('../../models/Address/Address');
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

    async getAddressByIdAndType(req, res) {
        try {
            var arr = [];
            const user_id = req.params.id;
            const type_user = req.params.type;
            await Address.find({}, function (err, docs) {
                docs.forEach(element => {
                    if (element['id_user'] == user_id && element['type_user'] == type_user) {
                        arr.push(element);
                    }
                });
                return res.json(arr);
            });
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao retornar endereço' })
        }
    },

}