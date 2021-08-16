import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Styles from './BookDetail.module.css'

import { Nav } from '../Nav'
import { Note } from './Note';


const ObjectId = require('mongodb')

export const BookDetail = ({match}) => {
    // This page will let users take notes on their books

    const [notesList, setNotesList] = useState([])
    const [page, setPage] = useState(null)
    const [noteText, setNoteText] = useState('')


   
    const pageId = match.params.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newNote = {
            _id: new ObjectId.ObjectID,
            text: noteText,
            pageNumber:page,
            bookId:pageId
        }

        axios.post('/notes/add', newNote)
            .then(res => console.log(res.data))
        
        setPage('')
        setNoteText('')
        
        setNotesList([...notesList, newNote])
    }

    useEffect(() => {
        const loadNotesList = () => {
        axios.get('/notes')
        .then(response => {
            setNotesList(response.data.filter(note => 
                note.bookId == pageId
            ))
        })
        .catch((err) => {
            console.log(err)
        })  
    }
    loadNotesList();

 }, [])

    const handleClear = () => {
        setNoteText('')
        setPage('')

    }

    const handleDelete = (id) => {
            axios.delete('/notes/'+id)
            .then(response => {console.log(response.data)});
    
            setNotesList(notesList.filter(el=>el._id !== id))
            console.log(notesList)

    }

    return (
        <div className={Styles.main}>
            <Nav />
            <h5> Use This page to keep notes as you read</h5>
            <div className={Styles.formborder}>
                <form className={Styles.mainform} onSubmit={(e) => handleSubmit(e)}>
                    <input className={Styles.pagenumber} type='number' placeholder='Page Number' value={page} onChange={(e)=>setPage(e.target.value)} min='0'></input>

                    <textarea className={Styles.notebox} rows='10' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>

                    <button className={Styles.formbutton}>Save Note</button>  
        
                </form>

                <button className={Styles.formbutton} onClick={() => handleClear()}>Clear Form</button>
            </div>
            <div>
                <ul>
                    {notesList.map(note => 
                        <Note id={note._id}
                         pageNumber={note.pageNumber}
                         text={note.text}
                         handleDelete={handleDelete}
                         key={note._id}
                         bookId={note.bookId}
                         setNotesList={setNotesList}
                         pageId={pageId}
                    />
                    )}
                </ul>
            </div>
         
        </div>
    )
}
