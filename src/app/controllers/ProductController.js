const Product = require('../models/Product')
const Category = require('../models/Category');
const path = require('path');
class ProductController {

    // GET 
    index(req, res, next) {
        let perPage = 12;
        let page = req.query.page || 1;
        Product.find({})
            .lean()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, product) => {
                Product.countDocuments((err, count) => { // đếm để tính xem có bao nhiêu trang
                    if (err) return next(err);
                    res.render('product', {
                        product, // sản phẩm trên một page
                        current: page, // page hiện tại
                        pages: Math.ceil(count / perPage) // tổng số các page
                    });
                });
            });


    }

    // GET  product/create
    create(req, res, next) {
        Category.find({})
            .lean()
            .then(category => res.render('product/create', { category }))
            .catch(next)
    }

    // POST product
    store(req, res, next) {
        if (!req.files || Object.keys(req.files).length === 0) {
            const product = new Product(req.body)
            product.save()
                .then(() =>
                    res.redirect('/admin')
                )
                .catch(next)
        } else {
            req.body.image = req.file.path.split(path.sep).slice(2).join('/')
            const product = new Product(req.body)
            product.save()
                .then(() =>
                    res.redirect('/admin')
                )
                .catch(next)
        }
    }

    // GET     edit      /product/:id/edit
    edit(req, res, next) {
        let productQuery = Product.findById(req.params.id).lean()
        let categoryQuery = Category.find({}).lean()
        Promise.all([productQuery, categoryQuery])
            .then(([product, category]) =>
                res.render('product/edit', {
                    product,
                    category
                }
                ))
            .catch(next)
    }

    // PUT  /product/:id
    update(req, res, next) {
        req.body.image = req.file.path.split(path.sep).slice(2).join('/')
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin'))
            .catch(next)

    }

    // DELETE /product/:id
    delete(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // ForceDELETE  /detail/:id/force
    forceDelete(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // PATCH /detail/:id/restore
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //POST  /product/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Product.delete({ _id: { $in: req.body.projectIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default: res.json({ message: 'ACtion is invalid' })
        }
    }

    //POST  /product/trash-form-action
    trashFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Product.deleteMany({ _id: { $in: req.body.projectIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)

                break;
            case 'restore':
                Product.restore({ _id: { $in: req.body.projectIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default: res.json({ message: 'Action is invalid' })
        }
    }

}

module.exports = new ProductController