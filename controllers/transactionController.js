const Transaction = require('../models/Transaction');
const User = require('../models/User');
const validator = require('../validator/transactionValidator');

module.exports = {
    getAllTransactions(req, res) {
        try {
            Transaction.find()
                .populate('author')
                .then(data => {
                    return res.json({ data, status: 'success' })
                })
        } catch (error) {
            console.log(error);
        }
    },
    createTransaction(req, res) {
        let { amount, type, note } = req.body
        const userId = req.user._id

        const validate = validator({ amount, type, note })

        if (!validate.isValid) {
            console.log("not valid");
            return res.json(validate.error)
        } else {
            // convert amount to Number format
            amount = validate.validData.amount

            let transaction = new Transaction({ amount, type, note })
            transaction.author = userId

            transaction.save()
                .then(trans => {

                    User.findById(userId)
                        .then(user => {
                            if (type === 'income') {
                                user.balance = user.balance + amount
                                user.income = user.income + amount
                            } else if (type === 'expense') {
                                user.balance = user.balance - amount
                                user.expense = user.expense + amount
                            }

                            // console.log(user.transactions);
                            user.transactions.unshift(trans._id)

                            User.findByIdAndUpdate({ _id: userId }, { $set: user }, { new: true })
                                .then(data => {
                                    console.log("Updated --------------------");
                                    console.log(data);
                                })
                                .catch(error => {
                                    console.log("Can't Updated --------------------");
                                    console.log(error);
                                })
                        })
                        .catch(error => {
                            console.log("user can't be found");
                            console.log(error);
                            console.log("user can't be found");
                        })

                    // 
                })
            res.json(transaction)
        }
    },
    getSingleTransaction(req, res) { },
    editTransaction(req, res) { },
    deleteTransaction(req, res) {

        try {
            Transaction.findOne({ _id: req.params.id })
                .then(transData => {

                    User.findById(req.user._id)
                        .then(user => {
                            const updated_user = { ...user._doc }

                            if (transData.type === 'income') {
                                updated_user.balance = updated_user.balance - transData.amount
                                updated_user.income = updated_user.income - transData.amount
                            } else if (transData.type === 'expense') {
                                updated_user.balance = updated_user.balance + transData.amount
                                updated_user.expense = updated_user.expense - transData.amount
                            }



                            User.findByIdAndUpdate({ _id: req.user._id }, { $set: updated_user }, { new: true })
                                .then(data => {
                                    console.log(data);

                                    Transaction.findByIdAndDelete(req.params.id)
                                        .then(data => {
                                            console.log(data);
                                            return res.json({ deleteCount: 1 })
                                        }).catch(err => {
                                            console.log(err);
                                        })
                                })
                                .catch(err => console.log(err))

                        }).catch(err => {
                            console.log("user error");
                        })
                })
                .catch(err => {
                    console.log(err);
                })


        } catch (error) {
            console.log(error);
        }
    }
}