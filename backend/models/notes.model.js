const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema



const noteSchema = new Schema({
    _id:{type: ObjectId, required: true},
    text: {type: String, required: true},
    pageNumber: {type: String, required: true},
    bookId:{type:String, required: true}
}, {
    timestamps:true,
})


const Note  = mongoose.model('Note', noteSchema)

module.exports = Note;