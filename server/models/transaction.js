var mongoose = require('mongoose');
Schema = mongoose.Schema;

var transactionSchema = mongoose.Schema({
  customer: {type: Schema.Types.ObjetId, ref: 'Customer'},
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
  date: Date,
  total: Number
});

var transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;
