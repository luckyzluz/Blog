const express = require('express')
const emailCtrl = require('../controller/email')
const emailValidator = require('../validator/email')
const auth = require('../middleware/auth')

const router = express.Router()
router.post('/',emailValidator.email,emailCtrl.email)
module.exports = router