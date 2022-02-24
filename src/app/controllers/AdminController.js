const Product = require('../models/Product')
const Category = require('../models/Category')
class AdminController {
    // GET 
    admin(req, res, next) {
        let productQuery = Product.find({}).lean()

        if (req.query.hasOwnProperty('_sort')) {
            productQuery = productQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([productQuery, Product.countDocumentsDeleted()])
            .then(([product, deletedCount]) =>
                res.render('admin/admin-product', {
                    deletedCount,
                    product
                }
                ))
            .catch(next)

    }

    trash(req, res, next) {
        Product.findDeleted({})
            .lean()
            .then(product => res.render('admin/admin-trash', { product }))
            .catch(next)
    }

    category(req, res, next) {
        Category.find({})
            .lean()
            .then(category => res.render('admin/admin-category', { category }))
    }

}

module.exports = new AdminController