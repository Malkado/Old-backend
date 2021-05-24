const mongoose = require('../database/database');

const ProfilePictureSchema = new mongoose.Schema({
    id_user: {
        type: Number,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
});

const ProfilePicture = mongoose.model('ProfilePicture', ProfilePictureSchema);

module.exports = ProfilePicture;