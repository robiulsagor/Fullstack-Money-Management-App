const { getAllTransactions, createTransaction, deleteTransaction } = require('../controllers/transactionController')
const { authenticate } = require('../middlewares/authenticate')

const router = require('express').Router()

router.get('/', authenticate, getAllTransactions)

router.post('/', authenticate, createTransaction)

router.delete('/:id', authenticate, deleteTransaction)


module.exports = router