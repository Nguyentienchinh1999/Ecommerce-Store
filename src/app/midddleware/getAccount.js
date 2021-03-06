const Account = require('../models/Account')
const jwt = require('jsonwebtoken');


module.exports = function getAccount(req, res, next) {
    // var token = req.cookies.token;
    let authen = req.session.userid
    if (authen) {
        // var result = jwt.verify(token, 'token')
        Account.findOne({ _id: authen }).then(account => {
            res.locals.account = account
            res.locals.username = account.username
            res.locals.role = account.role
            next()
        }).catch(next)
    } else (next())
}