import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './BookListItem.module.css'

import axios from 'axios'


export const BookListItem = ({title, author, id, handleDelete, status, user, loadBookList}) => {

      
    
    const handleMarkRead = (id) => {
        const updateBook = {
            _id:id,
            title: title,
            author: author,
            status: 'Read',
            user: user
        }

        axios.post('/books/update/'+id, updateBook)
        .then(res => console.log(res.data))

        loadBookList();
    }


    return (
        <div className={Styles.card}>
                <h3>{title}</h3>
                <h4>{author}</h4>
                <>{status === "Current"? <button className={Styles.button} onClick={()=>{handleMarkRead(id)}}>Mark as Read</button>:''}</>
                <Link to={`/${id}`} title={title}><button className={Styles.button}>Take Notes</button></Link>
                <button className={Styles.button} onClick={() => handleDelete(id)}>Remove</button>    
        </div>
    )
}
