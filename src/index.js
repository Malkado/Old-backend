const express = require("express");
const bodyParser = require('body-parser')
const routes = require('./routes/index.routing');
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
// app.use = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// require('./controller/authController')(app);
// require('./controller/projectController')(app);
// 
app.use(routes);
app.listen(port, () => {
    console.log('server is running on port: ', port);
});