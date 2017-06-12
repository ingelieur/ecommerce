const express = require('express')
const router = express.Router()

const Customer = require('../controllers/customer')
const Authentization = require('../controllers/authentization')

router.param('id', Authentization.customer)

router.get('/:id', Customer.showOne)
router.put('/:id',Customer.update)
router.delete('/:id', Customer.destroy)

module.exports = router
