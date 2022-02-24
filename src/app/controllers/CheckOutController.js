const Cart = require('../models/Cart')
const CheckOut = require('../models/CheckOut')
const jwt = require('jsonwebtoken');
class CheckOutlController {
    // GET 
    index(req, res, next) {
        if (!req.session.cart) {
            return res.render('cart', { prodcuts: null })
        }
        var cart = new Cart(req.session.cart)

        res.render('check-out', { products: cart.generateArray(), totalPrice: cart.totalPrice })

    }

    // POST
    payment(req, res, next) {
        var token = req.cookies.token;
        var result = jwt.verify(token, 'token')
        var name = req.body.name
        var address = req.body.address;
        var phone = req.body.phone;
        var account = result

        CheckOut.create({
            account: account,
            name: name, address: address, phone: phone
        })
            .then(() =>
                res.redirect('/info-payment')
            )
            .catch(next)

    }

}

module.exports = new CheckOutlController