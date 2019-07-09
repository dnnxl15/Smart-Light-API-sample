'use strict'

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
var express = require('express');
var UserController = require('../controllers/user');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

router.get('/home', UserController.home);//asyncMiddleware(UserController.home));
router.post('/test', UserController.test);
router.post('/save-user', UserController.saveUser);
router.get('/User', [auth, admin], UserController.getUsers);
router.get('/User/:id', auth, UserController.getUser);
router.put('/User/:id', auth, UserController.updateUser);
router.delete('/User/:id', [auth, admin], UserController.deleteUser);
router.post('/upload-image/:id', auth, multipartMiddleware, UserController.uploadImage);
router.get('/fetch-image/:username', auth, UserController.fetchImage);

module.exports = router;