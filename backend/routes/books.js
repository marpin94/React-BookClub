const router = require('express').Router();
let Book = require('../models/books.model')

router.route('/').get((req,res) => {
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/add').post((req,res) =>{
    const title = req.body.title;
    const author = req.body.author;
    const user = req.body.user;
    const status = req.body.status;
    
    const newBook = new Book({
        title,
        author,
        user,
        status

    })
    
    newBook.save()
    .then(()=> res.json('Book Added'))
    .catch(err =>res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req,res) => {
    Book.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}, (err,result) => {
        if (err){
            console.log(err);
        }
        console.log(result);
        res.send('Book Updated')
    })
})

router.route('/:id').delete((req,res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(book => res.json(book))
    .catch(err=> res.status(400).json('Error: ' + err))
})



module.exports = router