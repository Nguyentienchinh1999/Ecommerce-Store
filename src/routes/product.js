const express = require('express');
const router = express.Router()
const productController = require('../app/controllers/ProductController')
const checkLogin = require('../app/midddleware/checkLogin')
const checkAuthor = require('../app/midddleware/checkAuthor')
const upload = require('../app/uploadsFIle/upload')

router.get('/', productController.index)
router.get('/create', checkLogin, checkAuthor, productController.create)
router.post('/store', upload.single('image'), productController.store)
router.get('/:id/edit', productController.edit)
router.post('/handle-form-action', productController.handleFormAction)
router.post('/trash-form-action', productController.trashFormAction)
router.post('/:id', upload.single('image'), productController.update)
router.patch('/:id/restore', productController.restore)
router.delete('/:id', productController.delete)
router.delete('/:id/force', productController.forceDelete)

module.exports = router