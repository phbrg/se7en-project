const express = require('express');
const router = express.Router();
const AuthContoller = require('../controllers/AuthController');

router.get('/login', AuthContoller.loginPage);
router.get('/register', AuthContoller.registerPage);

router.post('/register', AuthContoller.createUser);
router.post('/login', AuthContoller.login);

router.get('/logout', AuthContoller.logout);

module.exports = router;