const mongoose = require('mongoose')
const Schema = mongoose

const transactionModel = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    note: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', transactionModel)
module.exports = Transaction