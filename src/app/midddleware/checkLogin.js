const Account = require('../models/Account')
const jwt = require('jsonwebtoken');
module.exports = function checkLogin(req, res, next) {
    // try {
    //     var token = req.cookies.token
    //     var result = jwt.verify(token, 'token')
    //     Account.findOne({
    //         _id: result
    //     })
    //         .then(account => {
    //             if (account) {
    //                 req.account = account
    //                 res.locals.account = account
    //                 res.locals.username = account.username

    //                 next()
    //             } else {
    //                 res.json('bạn k có quyền truy cập')
    //             }
    //         })
    //         .catch(next)

    // } catch (error) {
    //     return res.redirect('/login')
    // }
    var token = req.cookies.token;
    if (token) {
        var result = jwt.verify(token, 'token')
        Account.findOne({ _id: result })
            .then(account => {
                req.account = account
                next()
            })
    } else {
        res.render("account/login")
    }
}