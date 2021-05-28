const express = require('express');
const Account = require('../../models/DonationsInformation/Account/Account');
const router = express.Router();
const AuthUser = require('../../models/AuthUser');
const response = require('../../helper/response-helper');

module.exports = {

    async registerAccount(req, res) {
        const { user_id, type_account, name, CNPJ_CPF, bank, agency, number_account } = req.body;
        const { userId } = req;

        try {
            const checkUser = await AuthUser.findById(userId);
            if (!checkUser) {
                const status = 404;
                const message = 'Usuário não encontrado.';
                return res.json(response.responseMensage([], message, status));
            }

            const checkNumberAccount = await Account.findOne({ number_account });
            if (checkNumberAccount) {
                const status = 400;
                const message = 'Conta já cadastrada.';
                return res.json(response.responseMensage([], message, status));
            }

            const body = {
                "user_id": user_id,
                "type_account": Number(type_account),
                "name": name,
                "CNPJ_CPF": CNPJ_CPF,
                "bank": bank,
                "agency": agency,
                "number_account": number_account,
            };

            const createAccount = await Account.create(body);
            if (!createAccount) {
                const status = 500;
                const message = 'Falha ao criar a postagem.';
                return res.json(response.responseMensage([], message, status));
            }

            const status = 201;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([], message, status));
        } catch (error) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }

    },

    async getAccounts(req, res) {
        try {
            const user_id = req.params.id;
            var arr = [];
            await Account.find({}, function(err, docs) {
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

    async getAccountById(req, res) {
        const account_id = Number(req.params.id);
        const { userId } = req;
        try {
            const checkUser = await AuthUser.findById(userId);
            if (!checkUser) {
                const status = 404;
                const message = 'Usuário não encontrado.';
                return res.json(response.responseMensage([], message, status));
            }

            const findUser = await Account.findOne({ account_id })
            if (!findUser) {
                const status = 400;
                const message = 'Id de conta não existe';
                return res.json(response.responseMensage([], message, status));
            }

            const status = 200;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([findUser], message, status));
        } catch (error) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }

    },

    async updateAccount(req, res) {
        try {
            const {
                account_id,
                type_account,
                name,
                CNPJ_CPF,
                bank,
                agency,
                number_account
            } = req.body;
            const { userId } = req;


            if (!account_id, !type_account, !name, !CNPJ_CPF, !bank, !agency, !number_account) {
                const status = 400;
                const message = 'Parâmetros inválidos.';
                return res.json(response.responseMensage([], message, status));
            }
            const checkUser = await AuthUser.findById(userId);
            if (!checkUser) {
                const status = 404;
                const message = 'Usuário não encontrado.';
                return res.json(response.responseMensage([], message, status));
            }


            const bodyupdate = {
                "type_account": type_account,
                "name": name,
                "CNPJ_CPF": CNPJ_CPF,
                "bank": bank,
                "agency": agency,
                "number_account": number_account,
            };

            const getAccount = await Account.findOneAndUpdate({ account_id: account_id }, bodyupdate);
            if (!getAccount) {
                const status = 500;
                const message = 'Erro ao tentar atualizar.';
                return res.json(response.responseMensage([], message, status));
            }
            const status = 200;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([], message, status));
        } catch (e) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }
    },

    async removeAccount(req, res) {
        const { id } = req.body;
        const { userId } = req;
        try {
            if (!id) {
                const status = 400;
                const message = 'Parâmetros inválidos.';
                return res.json(response.responseMensage([], message, status));
            }

            const checkUser = await AuthUser.findById(userId);
            if (!checkUser) {
                const status = 404;
                const message = 'Usuário não encontrado.';
                return res.json(response.responseMensage([], message, status));
            }

            const removeAccountById = await Account.findOneAndDelete({ account_id: id });
            if (!removeAccountById) {
                const status = 500;
                const message = 'Falha ao remover conta';
                return res.json(response.responseMensage([], message, status));
            }
            const status = 200;
            const message = 'Função executada com sucesso.';
            return res.json(response.responseMensage([], message, status));
        } catch (error) {
            const status = 500;
            const message = 'Erro interno da função.';
            return res.json(response.responseMensage([], message, status));
        }
    }
}