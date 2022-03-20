const Cart = require('../models/Cart')
const Orders = require('../models/Orders')
const jwt = require('jsonwebtoken');
class CheckOutlController {
    // GET 
    index(req, res, next) {
        if (!req.session.cart) {
            return res.render('cart', { prodcuts: null })
        }
        let cart = new Cart(req.session.cart)
        res.render('check-out', { products: cart.generateArray(), totalPrice: cart.totalPrice })


    }

    // POST
    payment(req, res, next) {
        // let token = req.cookies.token;
        // let result = jwt.verify(token, 'token')
        let authen = req.session.userid
        let name = req.body.name
        let address = req.body.address;
        let phone = req.body.phone;
        let cart = new Cart(req.session.cart)
        Orders.create({
            account: authen,
            name: name, address: address, phone: phone,
            cart: cart
        })
            .then(() => {
                req.session.cart = null
                res.redirect('/info-payment')
            }

            )
            .catch(next)

    }

}

module.exports = new CheckOutlController