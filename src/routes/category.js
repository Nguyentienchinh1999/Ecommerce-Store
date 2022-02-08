const express = require('express');
const router = express.Router()
const categoryController = require('../app/controllers/CategoryController')


router.get('/create', categoryController.create)
router.post('/store', categoryController.store)
router.get('/:id', categoryController.index)
router.get('/:id/edit', categoryController.edit)
router.post('/:id/update', categoryController.update)
router.delete('/:id/delete', categoryController.delete)
module.exports = router