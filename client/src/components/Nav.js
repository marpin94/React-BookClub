import React, { useContext } from 'react'
import {Link, NavLink, useHistory} from 'react-router-dom'
import Styles from './Nav.module.css'
import UserContext from '../context/GlobalState'


export const Nav = () => {

    const {userData, setUserData} = useContext(UserContext)
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: null,
            user: null
        });

        localStorage.setItem("auth-token",'')
        history.push('/')
    }

    return (
            <nav className={Styles.navbar}>
                <ul>
                    <li><NavLink exact  activeClassName={Styles.activelink} to='/'> Home </NavLink></li>
                    
                    {userData.user ? 
                    <>
                    <button onClick={logout} className={Styles.logOutButton}>Log Out</button>
                    <li><NavLink activeClassName={Styles.activelink} to='/Booklist'> BookList </NavLink></li>
                    <li><NavLink to='AddBook' activeClassName={Styles.activelink}>Add To List</NavLink></li>
                    </>:
                    <>
                    <li><NavLink to='/Register' activeClassName={Styles.activelink}>  Register  </NavLink></li>
                    <li><NavLink to='/Login' activeClassName={Styles.activelink}>Log In</NavLink></li> </>}
                </ul>
            </nav>

    )
}
