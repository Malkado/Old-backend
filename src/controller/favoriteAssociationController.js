const express = require('express');
const FavoriteAssociation = require('../models/favoriteAssociations');
const response = require('../helper/response-helper');
const Association = require('../models/Register/AssociationUser');
const router = express.Router();

module.exports = {

    async favoriteAssociations(req, res) {
        try {
            const favoriteAssociation = await FavoriteAssociation.create(req.body);
            const status = 201;
            const message = 'Associação favoritada com Sucesso';
            return res.json(response.responseMensage([], message, status));
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao favoritar associação' })
        }
    },

    async disfavoriteAssociations(req, res) {
        try {
            const favoriteAssociation = await FavoriteAssociation.findOneAndDelete(req.params.id_association);
            const status = 200;
            const message = 'Associação desfavoritada com Sucesso';
            return res.json(response.responseMensage([], message, status));
        } catch (err) {
            return res.status(400).send({ error: 'Erro ao desfavoritar associação' })
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