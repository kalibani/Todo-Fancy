const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  member:{
    type: Schema.Types.ObjectId, ref: 'dataUser'
  },
  description:{
    type: String
  },
  date:{
    type: Date
  },
  status:{
    type: Boolean
  }
})

let todo = mongoose.model('todo', todoSchema);

class Todos {
  static findAll(){
    return new Promise(function(resolve, reject) {
      todo.find().populate("member").then((dataTodo) => {
        resolve(dataTodo)
      })
      .catch((err) => {
        reject(err)
      })
    });
  }

  static createTodo(body){
    return new Promise(function(resolve, reject) {
      var todos = {
        member: body.member,
        description: body.description,
        date: Date.now(),
        status: body.status
      }
      console.log(todos);
      todo.create(todos).then(dataTodo)
        resolve(dataTodo)
      .catch((err) => {
        reject(err)
      })
    });
  }

  static updateTodo(params, body) {
    return new Promise(function(resolve, reject) {
      var id = {
        _id : params.id
      }
      var update = {
        member: body.member,
        description: body.description,
        date: Date.now(),
        status: body.status
      }
      todo.findByIdAndUpdate(id, update).then((data) => {
        resolve(data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  }

  static deleteTodo(params){
    return new Promise(function(resolve, reject) {
      var id = {
        _id : params.id
      }
      todo.deleteOne(id).then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = Todos;
