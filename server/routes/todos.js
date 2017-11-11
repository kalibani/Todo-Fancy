var express = require('express');
var router = express.Router();
const todoCtrl = require('../controllers/todoCtrl');

router.get('/todos', todoCtrl.findAll )
router.get('/todos/:id', todoCtrl.getTodobyId)
router.post('/todos', todoCtrl.createTodo)
router.put('/todos/:id', todoCtrl.updateTodo )
router.delete('/todos/:id', todoCtrl.deleteTodo)

module.exports = router;
