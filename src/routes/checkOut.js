const express = require('express');
const router = express.Router()
const checkOutlController = require('../app/controllers/CheckOutController')

router.get('/', checkOutlController.index)

module.exports = router