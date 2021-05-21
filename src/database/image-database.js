const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect('mongodb+srv://luiz:R9uxnA5lXSVtNgXK@clusterteste.lrw2f.mongodb.net/clusterteste?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true,});
const connection = mongoose.connection;

connection.on('open',()=>console.log('Mongo: Connection OPEN!'));
connection.on('error',()=>console.log('Mongo: Connection FAILED!'));

mongoose.Promise = global.Promise;

module.exports = mongoose;
