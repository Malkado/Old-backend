const express = require('express');
const Account = require('../../models/DonationsInformation/Account/Account');
const router = express.Router();

module.exports = {

    async registerAccount(req, res) {
        try {
            const { number_account } = req.body;
            if (await Account.findOne({ number_account })) {
                return res.status(400).send({ error: 'Conta já cadastrada' });
            }
            const account = await Account.create(req.body);
            account.sequence_id = undefined;
            return res.status(201).send({ message: 'Conta registrada com sucesso!' })
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao registrar conta!' })
        }
    },

    async getAccounts(req, res) {
        try {
            const user_id = req.params.id;
            var arr = [];
            await Account.find({}, function (err, docs) {
                docs.forEach(element => {
                    if (element['user_id'] == user_id) {
                        arr.push(element);
                    }
                });
                return res.json(arr);
            });
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao retornar lista de contas' })
        }
    },
}