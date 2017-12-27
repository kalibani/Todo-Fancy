var express = require('express');
var router = express.Router();
const todoCtrl = require('../controllers/todoCtrl');

router.get('/profile', todoCtrl.validate, todoCtrl.getProfile)
router.get('/todos',  todoCtrl.validate, todoCtrl.findAll )
router.get('/todo/:id',  todoCtrl.validate, todoCtrl.getTodobyId)
router.post('/post/todo',  todoCtrl.validate, todoCtrl.createTodo)
router.put('/edit/todo/:id',  todoCtrl.validate, todoCtrl.updateTodo )
router.delete('/delete/todo/:id',  todoCtrl.validate, todoCtrl.deleteTodo)

module.exports = router;
