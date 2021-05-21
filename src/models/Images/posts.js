const mongoose = require('../../database/database');

const imagePostsSchema = new mongoose.Schema({
    img:
    {
        type: String,
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

imagePostsSchema.pre('save', async function (next) {
    const allSize = await ImagesPosts.count() + 1;
    this.sequence_id = allSize;
    next();
});

const post = mongoose.model('ImagesPosts', imagePostsSchema);

module.exports = post;