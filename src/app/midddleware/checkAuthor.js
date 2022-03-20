const Account = require('../models/Account')
const jwt = require('jsonwebtoken');
module.exports = function checkAdmin(req, res, next) {

    var role = req.account.role
    if (role === 'admin') {
        next()
    } else (
        res.render('account/warning')
    )
}