const Cart = require('../models/Cart')
module.exports = function getTotalCart(req, res, next) {
    let cart = req.session.cart
    if (cart) {
        res.locals.cart = cart
        res.locals.totalQty = cart.totalQty
        next()
    } else {
        next()
    }
}