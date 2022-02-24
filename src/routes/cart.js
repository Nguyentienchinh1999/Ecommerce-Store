const express = require('express');
const router = express.Router()
const cartlController = require('../app/controllers/CartController')

router.get('/', cartlController.index)
router.get('/add-to-cart/:id', cartlController.addToCart)
router.get('/delete-cart/:id', cartlController.deleteCart)

module.exports = router