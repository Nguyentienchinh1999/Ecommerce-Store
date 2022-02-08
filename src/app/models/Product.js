const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');

const Product = new Schema({
    _id: { type: Number },
    name: { type: String, require: true },
    description: { type: String, maxLength: 6000 },
    image: { type: String, },
    price: { type: String, maxLength: 255 },
    id_category: { type: String, },
    slug: { type: String, slug: "name", unique: true }

}, { collection: 'product', timestamps: true, _id: false })


mongoose.plugin(slug);
Product.plugin(AutoIncrement);
Product.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})


module.exports = mongoose.model('product', Product);