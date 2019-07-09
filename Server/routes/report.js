'use strict'

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
var express = require('express');
var ReportController = require('../controllers/report');
var router = express.Router();

router.post('/saveReport', auth, ReportController.saveReport);
router.get('/Report', auth, ReportController.getReports);
router.get('/Report/:id?', auth, ReportController.getReport);
router.put('/Report/:id', auth, ReportController.updateReport);
router.delete('/Report/:id', [auth, admin], ReportController.deleteReport);

module.exports = router;