'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RolesSchema = Schema({
    rolName: String,
});

module.exports = mongoose.model('Roles', RolesSchema);