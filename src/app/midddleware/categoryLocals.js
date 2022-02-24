const Category = require('../models/Category')
module.exports = function categoryLocals(req, res, next) {
    Category.find({}).lean()
        .then(category => {
            res.locals.category = category
            res.locals.session = req.session
            next()
        }).catch(next)
}
