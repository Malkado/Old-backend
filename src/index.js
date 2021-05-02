const express = require("express");
const app = express();
const cors = require('cors');
const router = require('./routes/index.routing');
require('dotenv').config();
require('./database/database');
const port = process.env.PORT || 3000;
//aplicação
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log('server is running on port: ', port);
});