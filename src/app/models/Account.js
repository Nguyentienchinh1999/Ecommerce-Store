const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Account = new Schema({

    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, required: true, default: 'user' },
    refreshToken: { type: String }
}, { collection: 'account', timestamps: true, })



module.exports = mongoose.model('account', Account);