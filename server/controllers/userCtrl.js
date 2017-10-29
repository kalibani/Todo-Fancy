const user = require('../models/user');

class UserCtrl {
  static login(req, res){
    user.login(req, res)
  }

}

module.exports = UserCtrl;
