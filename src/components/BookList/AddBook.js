import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Nav } from '../Nav';
import Styles from './AddBook.module.css'

import UserContext from '../../context/GlobalState'
import {useHistory} from 'react-router-dom'

export const AddBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor ] = useState('')
    const [status, setStatus] = useState('')

    const {userData} = useContext(UserContext)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()

        const newBook = {
        title: title,
        author: author,
        status: status,
        user: userData.user.displayName
        }

        axios.post('/books/add', newBook)
            .then(res=>console.log(res.data))


       history.push('/Booklist')
    }

    useEffect(()=>{
        console.log(userData)
    }, [userData])

    return (
        <>
        <Nav />
        <div className={Styles.formborder}>
        <form  className={Styles.main}>
      
            <label for = 'bookTitle'>Title</label> 
            <input 
            type='text'
            value = {title}
            id='bookTitle'
            onChange = {(e)=>setTitle(e.target.value)}
            placeholder='Book Title...'
            autoComplete='off'
            />
           
           <label for = 'bookAuthor'>Author</label>
            <input 
            type='text'
            value = {author}
            id='Author'
            onChange = {(e)=>setAuthor(e.target.value)} 
            placeholder='Author...'
            autoComplete='off' />
            
            <select name='status' onClick ={(e) => setStatus(e.target.value)}>
                <option value=''> Book Status...</option>
                <option value='Current'>Currently Reading</option>
                <option value='Read' >Completed</option>
                <option value='Wish' >Want to Read</option>
            </select>
            <br/>
            <button onClick={handleSubmit} className={Styles.formbutton}> Submit </button>
     
        </form>
        </div>
        </>
    )
}
