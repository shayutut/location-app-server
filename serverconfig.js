var app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookies = require("cookie-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookies());

module.exports = app;