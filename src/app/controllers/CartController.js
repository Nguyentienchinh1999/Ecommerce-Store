const Category = require('../models/Category')
class CartlController {
    // GET 
    index(req, res, next) {
        // Category.find({})
        //     .lean()
        //     .then(category => {
        //         res.render('cart', {
        //             category
        //         })
        //     })
        //     .catch(next)
        res.render('cart')
    }
}

module.exports = new CartlController