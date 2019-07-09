'use strict'

const auth = require('../middleware/auth');
var express = require('express');
var RolController = require('../controllers/rol');
var router = express.Router();

router.post('/saveRol', auth, RolController.saveRol);
router.get('/Rol', auth, RolController.getRoles);
router.get('/Rol/:id?', auth, RolController.getRolId);
router.put('/Rol/:id', auth, RolController.updateRol);


module.exports = router;