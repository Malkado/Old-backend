const mongoose = require('../database/database');

const FavoriteAssociationSchema = new mongoose.Schema({
    id_user: {
        type: Number,
        require: true,
    },
    id_association: {
        type: Number,
        require: true,
    },
});

const FavoriteAssociation = mongoose.model('FavoriteAssociation', FavoriteAssociationSchema);

module.exports = FavoriteAssociation;