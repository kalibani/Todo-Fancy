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

module.exports = mongoose.model('todo', todoSchema);
