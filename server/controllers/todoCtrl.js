const todos = require('../models/todos');

class Todos {
  static findAll(req, res){
    todos.findAll().then((dataTodo) => {
      res.send(dataTodo)
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static createTodo(req, res){
    todos.createTodo(req.body).then((dataTodo) => {
      res.send(dataTodo)
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static updateTodo(req, res){
    todos.updateTodo(req.params, req.body).then((dataTodo) => {
      res.send('Succes Update')
    })
    .catch((err) => {
      res.send(err)
    })
  }

  static deleteTodo(req, res){
    todos.deleteTodo(req.params).then(() => {
      res.send('successfully delete todo')
    })
    .catch((err) => {
      res.send(err)
    })
  }

}

module.exports = Todos;
