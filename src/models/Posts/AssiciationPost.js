const mongoose = require('../../database/database');

const AssociationPostSchema = new mongoose.Schema({
    association_sequence_id: {
        type: Number,
        require: true,
    },
    association_name: {
        type: String,
        require: true,
    },
    description: {
        type: String
    },
    image_sequence_id:{
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



const AssociationPost = mongoose.model('AssociationPost', AssociationPostSchema);

module.exports = AssociationPost;