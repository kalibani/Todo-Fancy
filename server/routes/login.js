var express = require('express');
var router = express.Router();
const loginCtrl = require('../controllers/loginCtrl');

router.post('/', loginCtrl.login )

module.exports = router;
