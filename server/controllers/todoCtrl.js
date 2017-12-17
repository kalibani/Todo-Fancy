const Todo = require('../models/todos');

class TodoCtrl {
  static validate(req, res, next){
    Todo.validate(req, res, next)
  }

  static findAll(req, res){
    Todo.findAll(req, res)
  }

  static createTodo(req, res){
    Todo.createTodo(req, res)
  }

  static getTodobyId(req, res){
    Todo.getTodobyId(req, res)
  }

  static updateTodo(req, res) {
    Todo.updateTodo(re, res)
  }

  static deleteTodo(req, res) {
    Todo.deleteTodo(req, res)
  }

  static getProfile(req, res){
    Todo.getProfile(req, res)
  }

}

module.exports = TodoCtrl;
