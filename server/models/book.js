var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book's title should not be empty."]
  },
  author: String,
  image: String,
  category: String,
  price: Number,
  stock: Number
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
