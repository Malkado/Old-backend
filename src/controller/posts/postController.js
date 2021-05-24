const associationModel = require('../../models/Register/AssociationUser');
const associationPostModel = require('../../models/Posts/AssiciationPost');
const AuthModel = require('../../models/AuthUser');
const response = require('../../helper/response-helper');

module.exports = {

    async createPost(req, res) {
        const { userId } = req;
        const { img, description } = req.body;
        if ((!img || !description)) {
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
        const association = await associationModel.find({ sequence_id: user.id_user });
        if (!association) {
            const status = 403;
            const message = 'Somente associação pode criar postagem.';
            return res.json(response.responseMensage([], message, status));
        }

        const body = {
            'association_sequence_id': association[0].sequence_id,
            'association_name': association[0].fantasy_name,
            'description': description,
            'image': img
        };

        const publishPost = await associationPostModel.create(body);

        if (!publishPost) {
            const status = 500;
            const message = 'Falha ao criar a postagem.';
            return res.json(response.responseMensage([], message, status));
        }

        const status = 201;
        const message = 'Função executada com sucesso.';
        return res.json(response.responseMensage([], message, status));
    },

    async listPost(req, res) {
        const { userId } = req;
        const { lastId } = req.body;


        const user = await AuthModel.findById(userId);
        if (!user) {
            const status = 404;
            const message = 'Usuário não encontrado.';
            return res.json(response.responseMensage([], message, status));
        }

        const listPost = !lastId ? await associationPostModel.find({}).limit(5) : await associationPostModel.find({}).sort("sequence_id").skip(5).limit(5);
        if (!listPost) {
            const status = 500;
            const message = 'Falha ao listar postagens.';
            return res.json(response.responseMensage([], message, status));
        }
        const status = 200;
        const message = 'Função executada com sucesso.';
        return res.json(response.responseMensage(listPost, message, status));
    }
}