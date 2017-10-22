const jwt = require('jsonwebtoken');
const FB = require('fb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userid:{
    type: Number
  },
  username:{
    type: String
  }
})

let User = mongoose.model('User', bookSchema);

class Login {
  // static login(req, res){
  //   let fb = new FB.Facebook({
  //     accessToken: req.body.accessToken,
  //     appId: process.env.FBAPPID,
  //     appSecret: process.env.FBAPPSECRET
  //   })
  //   fb.api(req.body.userId, 'post', { message: body }, function (res) {
  //     if(!res || res.error) {
  //       console.log(!res ? 'error occurred' : res.error);
  //       return;
  //     }
  //     console.log('Post Id: ' + res.id);
  //   });
  // }
}

module.exports = Login;
'visca el barca!!!'
