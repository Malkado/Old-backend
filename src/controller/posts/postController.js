const associationModel = require('../../models/Register/AssociationUser');
const postModel = require('../../models/Posts/AssiciationPost');
const associationPostModel = require('../../models/Posts/AssiciationPost');
const AuthModel = require('../../models/AuthUser');
const imageController = require('./imageController');
module.exports = {

    async createPost(req, res) {
        const { userId } = req;
        const { img, description } = req.body;
        console.log(req.body, userId);
        if ((!img || !description)) {
            return res.send('404- parâmetros inválidos.');//404- parâmetros inválidos.
        }

        const user = await AuthModel.findById(userId);
        if (!user) {
            return res.send('usuário não encontrado.');
        }
        const association = await associationModel.find({ sequence_id: user.id_user });
        console.log(association)
        if (!association) {
            res.send('Somente associação pode criar postagem '); // Somente associação pode criar postagem 
        }
        

        const imageId = imageController.writeImagePost(img);
        console.log(imageId);
        if (!imageId) {
            return res.send('erro ao salvar imagem'); //erro ao salvar imagem;
        }
        const body = {
            'association_sequence_id': association[0].sequence_id,
            'association_name': association[0].fantasy_name,
            'description': association[0].fantasy_name,
            'image_sequence_id': imageId
        };

        const publishPost = await associationPostModel.create(body);

        if (!publishPost) {
            return res.send('erro ao criar postagem');
        }

        return res.json({ messege: 'função executada com sucesso', publishPost });
    },
    async listPost(req, res) {

    }
}