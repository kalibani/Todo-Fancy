const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

let todoSchema = new Schema({
  member:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  todo:{
    type: String
  },
  description:{
    type: String
  },
  date:{
    type: String,
    created: Date
  },
  status:{
    type: Boolean,
    default: false
  }
})

let Todo = mongoose.model('todo', todoSchema);

class TodoModel {
  static validate(req, res, next){
    var token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, 'Visca El Barca', function (err, decoded) {
        if(err){
          return res.json({success: false, message: 'Problem With Token'})
        }else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(403).send({
        message: 'Access Denied!'
      })
    }
  }

  static findAll(req, res){
    Todo.find().populate('member').then((dataTodo) => {
      res.status(200).json(dataTodo)
    })
    .catch((err) => { res.status(404).send(err)})
  }

  static createTodo(req, res){
    var newTodo = new Todo({
      member: req.decoded.datauser._id,
      todo: req.body.todo,
      description: req.body.description,
      date: req.body.date,
      status: req.body.status
    })
    newTodo.save().then((dataTodo) => {
      res.status(200).json({ message: 'Todo Succesfully Added!', dataTodo })
    })
    .catch((err) => { res.status(404).send(err)
    })
  }

  static getTodobyId(req, res){
    Todo.findById(req.params.id).then((dataTodo) => { res.status(200).json(dataTodo)})
    .catch((err) => { res.status(404).send(err)})
  }

  static updateTodo(req, res) {
    Todo.findById(req.params.id).then((Todo) => {
      Todo.status = !Todo.status
      Todo.save().then((updatedTodo) => {
        res.json({message: 'Succesfully Updated Todo', updatedTodo})
      }).catch((err) => {
        res.send(err)
      })
    }).catch((err) => {
      res.send(err);
    })
  }

  static deleteTodo(req, res) {
    Todo.remove({_id : req.params.id})
      .then((result) => {
      res.json({ message: "Todo successfully deleted!", result });
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static getProfile(req, res){
    res.json(req.decoded.datauser)
  }

}

module.exports = TodoModel;
