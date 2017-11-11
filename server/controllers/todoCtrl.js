const Todo = require('../models/todos');

class Todos {
  static findAll(req, res){
    Todo.find().populate('member').then((dataTodo) => { res.status(200).json(dataTodo)})
    .catch((err) => { res.status(404).send(err)})
  }

  static createTodo(req, res){
    var newTodo = new Todo(req.body)
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
    Todo.findByIdAndUpdate(req.params.id,{$set:req.body})
    .then((updatedTodo) => {
      res.json({message: 'Succesfully Updated Todo', updatedTodo})
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

}

module.exports = Todos;
