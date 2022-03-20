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
    }

}

module.exports = new DetailController