const express = require('express')
const router = express.Router()

const Customer = require('../controllers/customer')
const Transaction = require('../controllers/transaction')
const Book = require('../controllers/book')
const Authentization = require('../controllers/authentization')

router.use(Authentization.admin)
//router.param('id', Authentization.admin)

router.get('/customers', Customer.showAll)
router.get('/transactions', Transaction.showAll)
router.get('/books', Book.showAll)

module.exports = router
