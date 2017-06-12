const express = require('express')
const router = express.Router()
const Customer = require('../controllers/customer')
const Authentization = require('../controllers/authentization')

router.get('/', (req,res) => {
  res.send('alive')
})

router.post('/signup', Customer.createCust)
//router.post('/sellSignup', Customer.createSell)
router.post('/adminSignup', Authentization.admin, Customer.createAdmin)
router.post('/signin', Customer.signin)


module.exports = router
