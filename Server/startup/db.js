const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  const db = config.get('db');
  const useNewUrlParser = config.get('useNewUrlParser');
  mongoose.connect(db,{useNewUrlParser:useNewUrlParser})
    .then(() => winston.info(`Connected to ${db}...`));
}