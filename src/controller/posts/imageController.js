const ImageModel = require('../../models/Images/posts');
module.exports = {
    async readImagePost(img) {
        console.log(img)
        const saveImage = await ImageModel.create({ img: img });
        console.log(saveImage);
        return saveImage[0] ? saveImage[0].sequence_id : null;
    },
    async writeImagePost(req, res) {

    }
}