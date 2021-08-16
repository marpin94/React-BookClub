import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import  UserContext from '../../context/GlobalState'
import Styles from './BookList.module.css'
import {BookListItem} from './BookListItem'
import { Nav } from '../Nav'
import {FilterButton} from './FilterButton'


export const BookList = () => {
    // TO DO users should be able to switch between completed, non-completed, and all books.

    const {userData, setUserData} = useContext(UserContext)
    
    const [bookList, setBookList] = useState([])
    const [filter, setFilter] = useState('All')

    const FILTER_MAP = {
        All: () => true,
        Current: book => book.status === 'Current',
        Read: book => book.status ==='Read',
        'Want to Read': book=> book.status ==='Wish'
    }
    
    const FILTER_NAMES = Object.keys(FILTER_MAP)


    const filterList = FILTER_NAMES.map(name => (
        <FilterButton 
        key={name} 
        name={name}
        isPressed={name === filter}
        setFilter = {setFilter}/>
    ))

    let loadBookList = () => {
        axios.get('/books')
        .then(response => {
            setBookList(response.data.filter(book => 
                book.user == userData.user.displayName
            ))
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadBookList();   
    }, [userData])

    const handleDelete = (id) => {
        axios.delete('/books/'+id)
        .then(response => {console.log(response.data)});

        setBookList(bookList.filter(el=>el._id !== id))
    }

    return (
        <>
        <Nav />
        <div className={Styles.gridcontainer}>
            {userData.user ? 
        <>
            <nav>
                <select className={Styles.filterList} onClick={(e)=>setFilter(e.target.value)}>
                    {filterList}
                </select>
            </nav>
            <div  className={Styles.bodymain}>
                <div className={Styles.booklistmain}>
                    <ul>
                    {bookList.filter(FILTER_MAP[filter]).map(book => 
                        <BookListItem title={book.title} 
                        author={book.author} 
                        id={book._id}
                        status={book.status}
                        handleDelete={handleDelete}
                        user = {userData.user.displayName}
                        loadBookList= {loadBookList} 
                        key ={book._id}/>
                        )}
                    </ul>  
                </div>               
            </div>
        </>:
            <div>
                <Nav />
            </div>}
        </div>
        </>
    )
}
