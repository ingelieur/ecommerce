var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book's title should not be empty."]
  },
  author: String,
  image: String,
  category: {
    type: String,
    enum: {values: ['Fiction', 'Non-fiction', 'Gifts'], message: '{PATH} should not be outside of the allowed values'}
  },
  price: Number,
  stock: {
    type: Number,
    min: 0
  }
})

var Book = mongoose.model('Book', bookSchema)

module.exports = Book
