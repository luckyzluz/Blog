const express = require('express')
const router = express.Router()
const testCtrl = require('../controller/test')
const emailValidator = require('../validator/email')
const auth = require('../middleware/auth')
// var child_process = require("child_process");

router.get('/',emailValidator.test, testCtrl.test)

module.exports = router