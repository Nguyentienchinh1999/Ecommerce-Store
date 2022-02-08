const Category = require('../models/Category')
function categoryLocals(req, res, next) {
    Category.find({}).lean()
        .then(category => {
           res.locals.category = category
            next()
        }).catch(next)
        
}
module.exports = categoryLocals