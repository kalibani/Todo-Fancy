const User = require('../models/users');

class UserCtrl {
  static login(req, res) {
    User.login(req, res)
  }

  static checkUser(req, res, next){
    User.checkUser(req, res, next)
  }

}

module.exports = UserCtrl;
