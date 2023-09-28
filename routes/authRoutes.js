const express = require('express');
const router = express.Router();
const AuthContoller = require('../controllers/AuthController');

router.get('/login', AuthContoller.login);
router.get('/register', AuthContoller.register);

router.post('/register', AuthContoller.registerPost);
router.post('/login', AuthContoller.loginPost);

router.get('/logout', AuthContoller.logout);

module.exports = router;