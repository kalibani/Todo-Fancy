var express = require('express');
var router = express.Router();
const todoCtrl = require('../controllers/todoCtrl');

router.get('/', todoCtrl.findAll )
router.post('/', todoCtrl.createTodo)
router.put('/:id', todoCtrl.updateTodo )
router.delete('/:id', todoCtrl.deleteTodo)

module.exports = router;
