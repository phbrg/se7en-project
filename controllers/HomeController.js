const User = require('../models/User');

module.exports = class HomeContoller {
  static homePage(req, res) {
    res.render('home/home');
  }

  static register(req, res) {
    const username = req.body.username;

    res.render('auth/register', { username })
  }
}