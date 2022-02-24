const Product = require('../models/Product')
class DetailController {
    // GET 
    index(req, res, next) {
        res.render('detail-product')
    }
    detail(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .lean()
            .then(product => {
                res.render('detail-product', {
                    product

                })
            })
            .catch(next)
        Product.find({}).lean().then(product => {
            res.locals.product = product;
            res.locals.productName = product.name
            res.locals.productImage = product.image
        })
    }

}

module.exports = new DetailController