'use strict'

const auth = require('../middleware/auth');
var express = require('express');
var AuditController = require('../controllers/audit');
var router = express.Router();

router.post('/saveAudit', auth, AuditController.saveAudit);

module.exports = router;