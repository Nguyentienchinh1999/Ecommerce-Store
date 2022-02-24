const Category = require('../models/Category')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
class CartlController {

    index(req, res, next) {
        if (!req.session.cart) {
            return res.render('cart', { prodcuts: null })
        }
        var cart = new Cart(req.session.cart)
        res.render('cart', { products: cart.generateArray(), totalPrice: cart.totalPrice })

    }


    addToCart(req, res, next) {
        var productId = req.params.id
        var cart = new Cart(req.session.cart ? req.session.cart : {})
        Product.findById(productId, function (err, product) {
            if (err) {
                return res.redirect('back')
            }
            cart.add(product, product.id)
            req.session.cart = cart
            res.redirect('back')
        })
    }

    deleteCart(req, res, next) {
        var cart = new Cart(req.session.cart ? req.session.cart : {})
        Product.findById(req.params.id, function (err, product) {
            if (err) {
                return res.redirect('back')
            }
            cart.delete(product, product.id)
            req.session.cart = cart
            res.redirect('back')
        })
    }
}

module.exports = new CartlController