const express = require('express');
const todoRoutes = require('../routes/todoRoutes');

module.exports = function (app) {
  app.use(express.json());

  app.use('/', todoRoutes);
};
