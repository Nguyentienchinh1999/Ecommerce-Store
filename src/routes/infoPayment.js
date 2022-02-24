const express = require('express');
const router = express.Router()
const infoPaymentController = require('../app/controllers/InfoPaymentController')

router.get('/', infoPaymentController.index)

module.exports = router