const Product = require('../models/Product')
class SiteController {
    // GET 
    index(req, res, next) {
        Product.find({}).lean().then(product => {
            res.render('home', { product })
        })
    }
}

module.exports = new SiteController