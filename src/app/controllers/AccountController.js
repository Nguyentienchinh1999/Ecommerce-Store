const Account = require('../models/Account')
const jwt = require('jsonwebtoken');
const config = require('../../config/configToken.json');

class AccountController {
    register(req, res, next) {

        try {
            var token = req.cookies.token
            var result = jwt.verify(token, 'token')
            Account.findOne({
                _id: result
            })
                .then(account => {
                    if (account) {
                        res.render('home')

                    } else {
                        res.json('bạn k có quyền truy cập')
                    }
                })
                .catch(next)

        } catch (error) {
            res.render('account/register')
        }
    }

    login(req, res, next) {
        try {
            var token = req.cookies.token
            var result = jwt.verify(token, 'token')
            Account.findOne({
                _id: result
            })
                .then(account => {
                    if (account) {
                        res.render('home')

                    } else {
                        res.json('bạn k có quyền truy cập')
                    }
                })
                .catch(next)

        } catch (error) {
            res.render('account/login')

        }
    }

    Registerstore(req, res, next) {

        var username = req.body.username
        var password = req.body.password
        var email = req.body.email
        Account.findOne({
            email: email
        })
            .then(account => {
                if (account) {
                    var error = 'Email đã có người sử dụng, vui lòng nhập email khác'
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
        var password = req.body.password
        var email = req.body.email
        Account.findOne({
            email: email,
            password: password,

        }).then(account => {
            if (account) {
                var token = jwt.sign({ _id: account._id }, 'token')
                // const refreshToken = jwt.sign(_id, config.refreshToken, { expiresIn: config.refreshTokenLife })
                // const response = {
                //     "status": "Logged in",
                //     "token": token,
                //     "refreshToken": refreshToken,
                // }
                // tokenList[refreshToken] = response
                res.cookie('token', token, { maxAge: 9000000 })
                res.redirect('back')
            } else {
                var error = 'Tên đăng nhập hoặc mật khẩu sai'
                res.render('account/login', { error })
            }
        })
            .catch(next)
    }

    // refreshToken(req, res, next) {
    //     const postData = req.body
    //     if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
    //         const user = {
    //             "email": postData.email,
    //             "name": postData.name
    //         }
    //         const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
    //         const response = {
    //             "token": token,
    //         }
    //         // update the token in the list
    //         tokenList[postData.refreshToken].token = token
    //         res.status(200).json(response);
    //     } else {
    //         res.status(404).send('Invalid request')
    //     }
    // }


    logOut(req, res, next) {

        res.clearCookie('token')
        res.redirect('/login')
    }

}


module.exports = new AccountController