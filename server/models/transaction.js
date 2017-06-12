var mongoose = require('mongoose')
Schema = mongoose.Schema

var transactionSchema = mongoose.Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  date: Date,
  total: Number
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction
