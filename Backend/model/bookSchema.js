const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  isbn: { type: String, unique: true, required: true },
  publishedDate: { type: Date },
  genre: { type: String },
  stockQuantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Book', bookSchema);