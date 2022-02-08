const express = require('express');
const router = express.Router()
const detailController = require('../app/controllers/DetailController')

router.get('/', detailController.index)
router.get('/:slug', detailController.detail)
module.exports = router