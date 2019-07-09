const express = require('express');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const user = require('../routes/user');

const light = require('../routes/light');
const report = require('../routes/report');
const category = require("../routes/category");
const rol = require("../routes/rol");
const audit = require("../routes/audit");

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/auth', auth);
    app.use('/api/user', user);
    app.use('/api/light', light);
    app.use('/api/report', report);
    app.use('/api/category', category);
    app.use('/api/rol', rol);
    app.use('/api/audit', audit);
    app.use(error);
}