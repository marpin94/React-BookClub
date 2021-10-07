import React, { useState } from 'react'
import { EditNote } from './EditNote'
import Styles from './Note.module.css'


export const Note = ({id, pageNumber, text, handleDelete, bookId, setNotesList, pageId}) => {
    
    const [hidden, setHidden] = useState(true)
    const [showEdit, setShowEdit] = useState(false)
    
    const handleView = () => {
        setHidden(!hidden)
    }

    const handleEdit = () => {
        setShowEdit(!showEdit)
    }
    


    return (
        <>
            <div className={hidden? Styles.note: Styles.shownote}>
            {pageNumber}
            <p onClick={()=> handleView()} className={Styles.noteText}>{text}</p>
            <button className={Styles.notebutton} onClick={()=>handleDelete(id)}>Delete</button>
            <button className={Styles.notebutton} onClick={()=> handleEdit(id)}>Edit</button>
            </div>
            <div class = {Styles.modal}>
                {showEdit? <EditNote pageNumber={pageNumber}
                 text={text}
                 id={id}
                 bookId = {bookId}
                 setShowEdit={setShowEdit}
                 showEdit={showEdit}
                 setNotesList={setNotesList}
                 pageId={pageId}
                 />: <></>}
            </div>
        </>
    )
}


//className={hidden? Styles.note:Styles.show}