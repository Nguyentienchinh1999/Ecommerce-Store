const Orders = require('../models/Orders')
const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
class InfoPaymentController {
    // GET 
    index(req, res, next) {
        // let token = req.cookies.token;
        // let result = jwt.verify(token, 'token')
        let authen = req.session.userid
        let cart
        let date = moment().format('mm:HH DD/MM/YYYY')
        Orders.find({ account: authen })
            .sort({ createdAt: 'desc' })
            .lean()
            .then(orders => {
                orders.forEach((order) => {
                    cart = new Cart(order.cart)
                    order.items = cart.generateArray();
                    order.totalPrice = cart.totalPrice
                    order.createdAt = date
                })
                res.render('info-payment', { order: orders, date: date })
            })

    }
}

module.exports = new InfoPaymentController