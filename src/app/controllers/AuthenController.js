const Account = require('../models/Account')
const jwt = require('jsonwebtoken');

class AccountController {
    register(req, res, next) {
        try {
            // let token = req.cookies.token
            // let result = jwt.verify(token, 'token')
            let authen = req.session.userid
            Account.findOne({
                _id: authen
            })
                .then(account => {
                    if (account) {
                        res.render('home')

                    } else {
                        res.render('account/register')
                    }
                })
                .catch(next)

        } catch (error) {
            res.render('account/register')
        }
    }

    login(req, res, next) {
        try {
            // let token = req.cookies.token
            // let result = jwt.verify(token, 'token')
            let authen = req.session.userid

            Account.findOne({
                _id: authen
            })
                .then(account => {
                    if (account) {
                        res.render('home')
                    } else {
                        res.render('account/login')
                    }
                })
                .catch(next)

        } catch (error) {
            res.render('account/login')

        }
    }

    Registerstore(req, res, next) {
        let username = req.body.username
        let password = req.body.password
        let email = req.body.email
        Account.findOne({
            email: email
        })
            .then(account => {
                if (account) {
                    let error = 'Email đã có người sử dụng, vui lòng nhập email khác'
                    res.render('account/register', { error })
                } else {
                    Account.create({
                        username: username,
                        password: password,
                        email: email
                    })
                    res.redirect('register/success')
                }
            })
            .catch(next)
    }

    registerSuccess(req, res, next) {
        res.render('account/register-success')
    }

    loginStore(req, res, next) {
        let password = req.body.password
        let email = req.body.email
        Account.findOne({
            email: email,
            password: password,

        }).then(account => {
            if (account) {
                // let token = jwt.sign({ _id: account._id }, 'token', { expiresIn: '1d' })

                // let refreshToken = jwt.sign({ _id: account._id }, 'refresh_token', { expiresIn: '1h' })
                // Account.updateOne({ _id: account._id }, { refreshToken: refreshToken })
                //     .then((accountupdate) => {
                //         res.status(200)
                //     }).catch(next)
                // console.log(account)

                req.session.userid = account._id

                res.redirect('back')
            } else {
                let error = 'Tên đăng nhập hoặc mật khẩu sai'
                res.render('account/login', { error })
            }
        })
            .catch(next)
    }

    refreshToken(req, res, next) {
        // let tokens = req.cookies.token;
        // let result = jwt.verify(tokens, 'token')
        // Account.findOne({ _id: result })
        //     .then(account => {
        //         let refreshToken = account.refreshToken
        //         jwt.verify(refreshToken, 'refresh_token')
        //         let newToken = jwt.sign({ _id: account._id }, 'token', { expiresIn: '15s' })
        //         res.cookie('token', newToken)
        //         let newRefreshToken = jwt.sign({ _id: account._id }, 'refresh_token', { expiresIn: '1h' })
        //         Account.updateOne({ _id: account._id }, { refreshToken: newRefreshToken })
        //             .then(() => {
        //                 res.status(200)
        //             })
        //     })
    }

    logOut(req, res, next) {
        req.session.userid = null
        res.redirect('/login')
    }

}


module.exports = new AccountController