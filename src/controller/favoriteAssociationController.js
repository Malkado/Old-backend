const express = require('express');
const FavoriteAssociation = require('../models/favoriteAssociations');
const response = require('../helper/response-helper');
const Association = require('../models/Register/AssociationUser');
const AuthModel = require('../models/AuthUser');

module.exports = {

    async favoriteAssociations(req, res) {
        const { userId } = req;
        const { id_user, id_association } = req.body;
        try {
            if ((!id_user || !id_association)) {
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
            const body = {
                id_user: id_user,
                id_association: id_association
            };
            const favoriteAssociation = await FavoriteAssociation.create(body);

            if (!favoriteAssociation) {
                const status = 403;
                const message = 'Falha ao favoritar a Associação';
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

    async desfavoriteAssociation(req, res) {
      
        const { userId } = req;
        const { id_association } = req.params.id_association;
        try {
            if ((!id_association)) {
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
            const favoriteAssociation = await FavoriteAssociation.findOneAndDelete(id_association);

            if (!favoriteAssociation) {
                const status = 403;
                const message = 'Falha ao desfavoritar a Associação';
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
    },

    async returnFavoriteAssociations(req, res) {
        try {
            var arr = [];
            const id_user = req.params.id_user;
            await FavoriteAssociation.find({}, function (err, docs) {
                docs.forEach(element => {
                    if (element['id_user'] == id_user) {
                        arr.push(element['id_association']);
                    }
                });
                Association.find({ sequence_id: { $in: arr } })
                    .then(docs => {
                        return res.json(docs);
                    })
                    .catch(err => {
                        return res.status(400).send({ error: 'Erro ao lista de associações favoritadas endereço' })
                    });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao lista de associações favoritadas endereço' })
        }
    }

}