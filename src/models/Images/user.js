const mongoose = require('../../database/database');

const imageUserSchema = new mongoose.Schema({
    img:
    {
        type: String,
        require: true,
    },
    id_user: {
        type: Number,
        require: true,
    },
    sequence_id: {
        type: Number,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    }
});

imageUserSchema.pre('save', async function (next) {
    const allSize = await userImage.count() + 1;
    this.sequence_id = allSize;
    next();
});

const userImage = mongoose.model('ImageUser', imageUserSchema);

module.exports = userImage;