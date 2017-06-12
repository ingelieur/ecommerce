const Transaction = require('../models/transaction')
const Book = require('../models/book')

var create = ((req,res) => {
  let newTransaction = new Transaction({
    customer: req.body.customer,
    books: req.body.books,
    total: req.body.total,
    date: new Date()
  })
  console.log(newTransaction)
  newTransaction.save((err, createdTransaction) => {
    res.send(err ? err : createdTransaction)
  })
})

var showAll = ((req,res) => {
  Transaction.find((err, transactions) => {
    res.send(err ? err : transactions)
  })
})

var showOne = ((req,res) => {
  Transaction.find({_id: req.params.id}, (err, transaction) => {
    res.send(err ? err : transaction)
  })
})

var update = ((req,res) => {
  Transaction.findByIdAndUpdate(req.params.id, {$set: req.body}, {runValidators: true}, (err,transaction) => {
    res.send(err ? err : transaction)
  })
})

var destroy = ((req,res) => {
  Transaction.findByIdAndRemove(req.params.id, (err,transaction) => {
    res.send(err ? err : transaction)
  })
})

var checkOut = ((req,res) => {
  let books = req.body.purBooks
  books.forEach(book => {
    Book.findByIdAndUpdate(book.id, {$dec: {stock: book.count}}, {runValidators: true}, (err,purBook) => {
      if(err) console.log(err)
    })
  })
  let newTransaction = new Transaction({
    customer: req.body.customer,
    books: req.body.books,
    total: req.body.total,
    data: new Date()
  })
  newTransaction.save((err, createdTransaction) => {
    res.send(err ? err : createdTransaction)
  })
})

module.exports = {
  create,
  showAll,
  showOne,
  update,
  destroy,
  checkOut
}
