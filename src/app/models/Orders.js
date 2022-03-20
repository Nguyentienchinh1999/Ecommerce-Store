const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CheckOut = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'account' },
    cart: { type: Object, required: true },
    name: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: Number, require: true }

}, { collection: 'orders', timestamps: true, })



module.exports = mongoose.model('orders', CheckOut);
