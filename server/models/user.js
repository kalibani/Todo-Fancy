const jwt = require('jsonwebtoken');
const FB = require('fb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

let dataUser = mongoose.model('dataUser', userSchema);


class User {
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
        if (req.body.userId == response.id) {
          dataUser.username = response.id
          dataUser.password = response.name
            dataUser.findOne({username: response.id})
            .then(() => {
              var token = jwt.sign({
                id: response.id,
                username: response.name,
              }, 'visca el barca!!!');
              res.status(200).json(token);
            })
            .catch(err=>{
              res.send(err)
            })

          } else {
            res.send('You do not have access')
          }
        }
    })
  }
}

module.exports = User;
