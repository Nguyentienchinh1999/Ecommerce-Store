const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({

    name: { type: String, require: true },
    icon: { type: String, }
}, { collection: 'category', timestamps: true, })



module.exports = mongoose.model('category', Category);