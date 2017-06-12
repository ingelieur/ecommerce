const Book = require('../models/book')

var create = ((req,res) => {
  let newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock,
    price: req.body.price,
    image: req.body.image
  })
  newBook.save((err, createdBook) => {
    res.send(err ? err : createdBook)
  })
})

var showAll = ((req,res) => {
  Book.find((err, books) => {
    res.send(err ? err : books)
  })
})

var showOne = ((req,res) => {
  Book.find({_id: req.params.id}, (err, book) => {
    res.send(err ? err : book)
  })
})

var showByCat = ((req,res) => {
  Book.find({category: req.params.category}, (err,books) => {
    res.send(err ? err : books)
  })
})

var update = ((req,res) => {
  Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {runValidators: true}, (err,book) => {
    res.send(err ? err : book)
  })
  //Book.findById(req.params.id, (err, book) => {
  //  if (err) res.send(err)
  //  else {
  //    Book.title = req.body.title || book.title
  //    Book.author = req.body.author || book.author
  //    Book.category = req.body.category || book.category
  //    Book.stock = req.body.stock || book.stock
  //    Book.price = req.body.price || book.price
  //    Book.image = req.body.image || book.image
  //    Book.save((err, savedBook) => {
  //      err ? res.send(err) : res.send(`Book is successfully updated.\n${savedBook}`)
  //    })
  //  }
  //})
})

var destroy = ((req,res) => {
  Book.findByIdAndRemove(req.params.id, (err,book) => {
    res.send(err ? err : book)
  })
})

var searchTitle = ((req, res) => {
  let query = req.body.search
  Book.find({title: new RegExp(query,'i')}, (err, books) => {
    console.log(books)
    res.send(err ? err : books)
  })
})

//var purchased = ((req,res,next) => {
//  let books = req.body.purBooks
//  books.forEach(book => {
//    Book.findByIdAndUpdate(book.id, {$dec: {stock: book.count}}, {runValidators: true}, (err,purBook) => {
//      if (err) res.send(err)
//    })
//  })
//  next()
//})

module.exports = {
  create,
  showAll,
  showOne,
  showByCat,
  update,
  //purchased,
  destroy,
  searchTitle
}
