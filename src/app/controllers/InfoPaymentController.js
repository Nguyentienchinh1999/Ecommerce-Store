const CheckOut = require('../models/CheckOut')
const jwt = require('jsonwebtoken');
class InfoPaymentController {
    // GET 
    index(req, res, next) {
        var token = req.cookies.token;
        var result = jwt.verify(token, 'token')
        CheckOut.find({ name: 123 }).populate('account').then((data) => console.log(data)).catch()
        res.render('info-payment')
    }
}

module.exports = new InfoPaymentController