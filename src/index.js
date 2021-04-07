const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const port = process.env.PORT || 3000;

// app.use = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
require('./controller/authController')(app);

app.listen(port, () => {
    console.log('server is running on port: ', port);
});