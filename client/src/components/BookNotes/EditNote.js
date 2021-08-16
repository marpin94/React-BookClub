import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Style from './EditNote.module.css'

export const EditNote = ({text, pageNumber, id, bookId, setShowEdit, setNotesList, pageId}) => {

    const [updateText, setUpdateText] = useState(text)
    const [updatePageNumber, setUpdatePageNumber] = useState(pageNumber)

    let updateId = id
    let updateBookId = bookId

    // useEffect(() => {
    //     const getNote = () => {
    //         axios.get(`/notes/${id}`)
    //         .then(res => console.log(res.data) )
    //     }

    //     getNote();
        
    // }, [])

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
   

    const handleSave = (id) => {

        const updateNote = {
            _id: id,
            text: updateText ,
            pageNumber: updatePageNumber,
            bookId:updateBookId
        }

        axios.post('/notes/update/'+id, updateNote)
        .then(res => console.log(res.data))

     
        setShowEdit(false)
        loadNotesList();

    }



    return (
        <div className={Style.popup}>
            <h1>EDITING</h1>
           
                <input type='number' placeholder='Page Number' value={updatePageNumber} onChange={(e)=>setUpdatePageNumber(e.target.value)} min='0'></input>
             

                <textarea className={Style.editTextForm} rows='15' value={updateText} onChange={(e)=>setUpdateText(e.target.value)}></textarea>

                <button onClick={() => handleSave(id)}>Save Note</button>  
      
            
        </div>
    )
}
