const Login = require('../models/login');

class LoginCtrl {
  static login(req, res){
    Login.login(req, res)
  }

}

module.exports = LoginCtrl;
