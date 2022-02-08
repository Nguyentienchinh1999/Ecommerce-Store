const express = require('express');
const router = express.Router()
const cartlController = require('../app/controllers/CartController')

router.get('/', cartlController.index)

module.exports = router