class CheckOutlController {
    // GET 
    index(req, res, next) {
        res.render('check-out')
    }
}

module.exports = new CheckOutlController