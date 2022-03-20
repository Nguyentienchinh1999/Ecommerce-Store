const express = require('express');
const router = express.Router()
const AuthenController = require('../app/controllers/AuthenController')
router.get('/register', AuthenController.register)
router.get('/login', AuthenController.login)
router.post('/register/store', AuthenController.Registerstore)
router.get('/register/success', AuthenController.registerSuccess)
router.post('/login', AuthenController.loginStore)
router.get('/refresh_token', AuthenController.refreshToken)
router.get('/logout', AuthenController.logOut)
module.exports = router