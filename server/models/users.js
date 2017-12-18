const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const FB = require('fb');

let userSchema = new Schema({
  email:{
    type: String
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

let User =  mongoose.model('User', userSchema);

class UserModel {
  static checkUser(req, res, next){
    User.findOne({
      email: req.body.email
    }).then((dataUser) => {
      if (!dataUser) {
        let newUser = ({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
        })
        User.create(newUser)
        .then((data) => {
          next()
        })
        .catch((err) => {
          res.status(404).send(err)
        })
      }else {
        next()
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  static login(req, res){
    let fb = new FB.Facebook({
      accessToken: req.body.accessToken,
      appId: process.env.FBAPPID,
      appSecret: process.env.FBAPPSECRET
    })
    fb.api(req.body.userId, function(response) {
      if (response.error) {
        res.status(400).json(response.error);
      } else {
        User.findOne({
          email: req.body.email
        }).then((datauser) => {
          var token = jwt.sign({datauser}, 'Visca El Barca');
          res.status(200).json(token);
        }).catch((err) => {
          console.log(err);
        })

      }
    });
  }

}

module.exports = UserModel;
