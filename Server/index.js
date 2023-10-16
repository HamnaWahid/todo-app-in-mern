const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
require('express-async-errors');
const winston = require('winston');

const app = express();
app.use(cors());
require('./startup/db')();
require('./startup/logging');
require('./startup/routes')(app);

const PORT = config.get('port') || 3001;
const server = app.listen(PORT, () => {
  console.log('Server running on port', PORT);
  winston.debug(`Listening on port ${PORT}...`);
});

module.exports = server;
