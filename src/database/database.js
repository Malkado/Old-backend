const mongoose = require('mongoose');
require('dotenv').config()
// const data_url = process.env.DB_URL;
// const replace_url = data_url.replace('<user>', process.env.DB_USER).replace('<password>', process.env.DB_PASSWORD).replace('<database>', process.env.DB_NAME).replace('<database>', process.env.DB_NAME);
// mongoose.connect(replace_url.toString(),{useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.connect('mongodb+srv://jessica:lKoKSKBfeGzqpVS8@cluster02.q8gzu.mongodb.net/cluster02?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true,});
const connection = mongoose.connection;

connection.on('open',()=>console.log('Mongo: Connection OPEN!'));
connection.on('error',()=>console.log('Mongo: Connection FAILED!'));

mongoose.Promise = global.Promise;

module.exports = mongoose;
