const router = require('express').Router();
let Note = require('../models/Notes.model')

router.route('/').get((req,res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/:id').get((req,res) => {
    Note.findById(req.params.id)
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: '+ err))
})


router.route('/add').post((req,res) =>{

    const _id = req.body._id;
    const text  = req.body.text;
    const pageNumber = req.body.pageNumber;
    const bookId = req.body.bookId
    

    
    const newNote = new Note({
       
        _id,
        text,
        pageNumber,
        bookId,
       

    })
    
    newNote.save()
    .then(()=> res.json('Note Added'))
    .catch(err =>res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req,res) => {
    Note.findByIdAndDelete(req.params.id)
    .then(note => res.json(note))
    .catch(err=> res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req,res) => {
    Note.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}, (err,result) => {
        if (err){
            console.log(err);
        }
        console.log(result);
        res.send('Note Updated')
    })
})
    
   



module.exports = router