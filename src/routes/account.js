const express = require('express');
const router = express.Router()
const AccountController = require('../app/controllers/AccountController')
const validateUser = require('../app/midddleware/validationUser')
const checkLogin = require('../app/midddleware/checkLogin')

router.get('/register', AccountController.register)
router.get('/login', AccountController.login)
// router.get('/private', checkLogin, AccountController.nextPrivate)
router.post('/register/store',  AccountController.Registerstore)
router.post('/login', AccountController.loginStore)
router.get('/logout', AccountController.logOut)
module.exports = router