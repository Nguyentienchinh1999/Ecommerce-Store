const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckOut = new Schema({
    account: { type: String, ref: 'account' },
    cart: { type: String, require: true },
    name: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: Number, require: true }

}, { collection: 'checkout', timestamps: true, })

module.exports = mongoose.model('checkout', CheckOut);
