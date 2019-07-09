'use strict'

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
var express = require('express');
var CategoryController = require('../controllers/category');
var router = express.Router();


router.delete('/Category/:lightId', [auth, admin], CategoryController.deleteCategory);
router.get('/Category/:user_id_master', auth, CategoryController.getCategories);

module.exports = router;
