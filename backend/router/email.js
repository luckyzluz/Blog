const express = require('express')
const emailCtrl = require('../controller/email')
const emailValidator = require('../validator/email')
const auth = require('../middleware/auth')

const router = express.Router()
router.post('/register', emailValidator.emailRegistration, emailCtrl.emailRegistration)
router.post('/updatepwd', auth, emailValidator.updatePwdValidation, emailCtrl.updatePwdValidation)
module.exports = router