const Address = require('../../models/Address/Address');
const AuthUser = require('../../models/AuthUser');
const response = require('../../helper/response-helper');

module.exports = {

    async registerAddress(req, res) {
        try {
            const {
                street,
                city,
                state,
                zipcode,
                neighborhood,
                uf,
                country,
                type_user,
                id_user
            } = req.body;

            if (!street, !city, !state, !zipcode, !neighborhood, !uf, !country, !type_user, !id_user) {
                const status = 400;
                const message = 'Parâmetros inválidos.';
                return res.json(response.responseMensage([], message, status));
            }

            const body = {
                "type_user": type_user,
                "id_user": id_user,
                "street": street,
                "city": city,
                "state": state,
                "zipcode": zipcode,
                "neighborhood": neighborhood,
                "uf": uf,
                "country": country
            };
            const createAddress = await Address.create(body);
            if (!createAddress) {
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

    async getAddressByIdAndType(req, res) {
        try {
            var arr = [];
            const user_id = req.params.id;
            const type_user = req.params.type;
            await Address.find({}, function(err, docs) {
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

    async removeAddress(req, res) {
        try {
            let addressRemove;
            const id_user = req.params.id;
            const type_user = req.params.type;
            await Address.find({ id_user: id_user, type_user: type_user }, function(err, docs) {
                addressRemove = docs;
            });
            await Address.findOneAndDelete(addressRemove);
            const status = 200;
            const message = 'Endereço removido com Sucesso';
            return res.json(response.responseMensage([], message, status));
        } catch (err) {
            const status = 400;
            const message = 'Erro ao remover Endereço';
            return res.json(response.responseMensage([], message, status));
        }
    },

    async updateUserAddress(req, res) {
        try {
            const {
                address_Id,
                street,
                city,
                state,
                zipcode,
                neighborhood,
                uf,
                country
            } = req.body;
            const { userId } = req;


            if (!address_Id, !street, !city, !state, !zipcode, !neighborhood, !uf, !country) {
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
                "street": street,
                "city": city,
                "state": state,
                "zipcode": zipcode,
                "neighborhood": neighborhood,
                "uf": uf,
                "country": country
            };

            const getAddress = await Address.findOneAndUpdate({ sequence_id: address_Id }, bodyupdate);
            if (!getAddress) {
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
    }

}