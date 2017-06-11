const Book = require('../models/book');

var createBook = ((req,res) => {
  let newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock,
    price: req.body.price,
    image: req.body.image
  });
  newBook.save((err, createdBook) => {
    res.send(err ? err : `Book is successfully added.\n${createdBook}`);
  });
});

var showBooks = ((req,res) => {
  Book.find((err, books) => {
    res.send(err ? err : books);
  });
});

var showBook = ((req,res) => {
  Book.find({_id: req.params.id}, (err, book) => {
    res.send(err ? err : books);
  });
});

var showByCat = ((req,res) => {
  Book.find({category: req.params.category}, (err,book) => {
    res.send(err ? err : book);
  });
});

var updateBook = ((req,res) => {
  Book.findByIdAndUpdate(req.params.id, {$set: req.body}, {runValidators: true}, (err,book) => {
    res.send(err ? err : book);
  });
  //Book.findById(req.params.id, (err, book) => {
  //  if (err) res.send(err);
  //  else {
  //    Book.title = req.body.title || book.title;
  //    Book.author = req.body.author || book.author;
  //    Book.category = req.body.category || book.category;
  //    Book.stock = req.body.stock || book.stock;
  //    Book.price = req.body.price || book.price;
  //    Book.image = req.body.image || book.image;
  //    Book.save((err, savedBook) => {
  //      err ? res.send(err) : res.send(`Book is successfully updated.\n${savedBook}`);
  //    });
  //  }
  //});
});

var deleteBook = ((req,res) => {
  Book.findByIdAndRemove(req.params.id, (err,book) => {
    res.send(err ? err : `Book ${book} is deleted`);
  });
});

var purchasedBook = ((req,res,next) => {
  let books = req.body.purBooks;
  books.forEach(book => {
    Book.findByIdAndUpdate(book.id, {$dec: {stock: book.count}}, {runValidators: true}, (err,purBook) => {
      if (err) res.send(err);
    });
  });
  next();
});

module.exports = {
  createBook,
  showBooks,
  showBook,
  showByCat,
  updateBook,
  deleteBook,
  purchasedBook
};
