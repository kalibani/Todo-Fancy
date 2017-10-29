var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/', userCtrl.login )

module.exports = router;
