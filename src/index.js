const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const routes = require('./routes/index.routing');
const authController  = require('./controller/authController');
require('dotenv').config();
const port = process.env.PORT || 3000;

// app.use = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// require('./controller/authController')(app);
require('./controller/projectController')(app);
// 
app.use(routes);
app.listen(port, () => {
    console.log('server is running on port: ', port);
});