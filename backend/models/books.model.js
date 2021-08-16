const mongoose = require('mongoose')
const Schema = mongoose.Schema


const booksSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    user: {type: String, required:true},
    status: {type: String, required: true}
}, {
    timestamps:true,
})


const Book  = mongoose.model('Book', booksSchema)

module.exports = Book;