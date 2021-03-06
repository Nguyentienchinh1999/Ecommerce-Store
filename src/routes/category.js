const express = require('express');
const router = express.Router()
const categoryController = require('../app/controllers/CategoryController')
const checkLogin = require('../app/midddleware/checkLogin')
const checkAuthor = require('../app/midddleware/checkAuthor')
const upload = require('../app/uploadsFIle/upload')

router.get('/create', checkLogin, checkAuthor, categoryController.create)
router.post('/store', upload.single('icon'), categoryController.store)
router.get('/:id', categoryController.index)
router.get('/:id/edit', categoryController.edit)
router.post('/:id/update', upload.single('icon'), categoryController.update)
router.delete('/:id/delete', categoryController.delete)
module.exports = router