const mongoose = require('mongoose');


const data_url = process.env.DB_URL;

const replace_url = data_url.replace('<user>', process.env.DB_USER).replace('<password>', process.env.DB_PASSWORD);


mongoose.connect(replace_url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.on('open',()=>console.log('Mongo: Connection OPEN!'));
connection.on('error',()=>console.log('Mongo: Connection FAILED!'));

module.exports = connection;