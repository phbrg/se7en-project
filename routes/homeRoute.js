const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/', HomeController.homePage);

router.post('/', HomeController.register);

module.exports = router;