const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000



app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection success')
})

const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

const booksRouter = require('./routes/books.js')
app.use('/Books', booksRouter)

const notesRouter = require('./routes/notes.js')
app.use('/notes', notesRouter)

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
})