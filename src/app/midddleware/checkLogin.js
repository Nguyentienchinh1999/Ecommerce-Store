const Account = require('../models/Account')
const jwt = require('jsonwebtoken');
module.exports = function checkLogin(req, res, next) {

    // var token = req.cookies.token;
    let authen = req.session.userid
    if (authen) {
        // var result = jwt.verify(token, 'token')
        Account.findOne({ _id: authen })
            .then(account => {
                req.account = account
                next()
            })
    } else {
        res.render("account/login")
    }
}