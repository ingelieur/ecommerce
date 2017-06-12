const express =require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ecommerce')

const index = require('./routes/index')
const admin = require('./routes/admin')
const books = require('./routes/books')
const customers = require('./routes/customers')
const transactions = require('./routes/transactions')

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', index)
app.use('/dashboard', admin)
app.use('/api/books', books)
app.use('/api/customers', customers)
app.use('/api/transactions', transactions)

app.listen(3000)
