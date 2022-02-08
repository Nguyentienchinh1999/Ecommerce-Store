const express = require('express');
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')


router.get('/', AdminController.admin)
router.get('/trash', AdminController.trash)
router.get('/category', AdminController.category)


module.exports = router