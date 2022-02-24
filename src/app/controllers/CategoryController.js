const Category = require('../models/Category')
const Product = require('../models/Product')
const path = require('path');
class CategoryController {
    index(req, res, next) {
        Product.find({ id_category: req.params.id }).lean()
            .then(product => {
                res.render('category/detail-category', { product })
            })

    }

    create(req, res, next) {
        res.render('category/create')
    }

    store(req, res, next) {
        req.body.icon = req.file.path.split(path.sep).slice(2).join('/')
        const category = new Category(req.body)
        category.save()
            .then(() => res.redirect('/admin/category'))
            .catch(next)
    }

    // GET edit
    edit(req, res, next) {
        Category.findById(req.params.id)
            .lean()
            .then(category => res.render('category/edit', { category }))
            .catch(next)
    }

    //POST update
    update(req, res, next) {
        req.body.icon = req.file.path.split(path.sep).slice(2).join('/')
        Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/category'))
            .catch(next)

    }

    delete(req, res, next) {
        Category.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}
module.exports = new CategoryController