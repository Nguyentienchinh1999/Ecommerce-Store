const express = require('express');
const router = express.Router()
const AuthorController = require('../app/controllers/AuthorController')
router.get('/', AuthorController.admin)
router.get('/trash', AuthorController.trash)
router.get('/category', AuthorController.category)


module.exports = router