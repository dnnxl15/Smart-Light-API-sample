'use strict'

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
var express = require('express');
var LightController = require('../controllers/light');
var router = express.Router();

router.post('/saveLight', auth, LightController.saveLight);
//router.get('/Light',  auth, LightController.getLights);
//router.get('/Light/:id?',  auth, LightController.getLightId);
router.get('/Light/:user_id_master?', auth, LightController.getLightUserId);
router.put('/Light/:id',  auth, LightController.updateLight);
router.delete('/Light/:id',  [auth, admin], LightController.deleteLight);

module.exports = router;