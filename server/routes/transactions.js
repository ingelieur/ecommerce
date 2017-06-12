const express = require('express')
const router = express.Router()

const Transaction = require('../controllers/transaction')
const Authentization = require('../controllers/authentization')

router.post('/', Authentization.customer, Transaction.create)
router.get('/', Authentization.admin, Transaction.showAll)
router.get('/:id', Transaction.showOne)
router.put('/:id',Transaction.update)
router.delete('/:id', Transaction.destroy)

router.post('/checkout', Transaction.checkOut)

module.exports = router
