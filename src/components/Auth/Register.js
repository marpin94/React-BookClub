import React, {useContext, useState} from 'react'
import Styles from './Register.module.css'
import {Nav} from  '../../components/Nav'

import UserContext from '../../context/GlobalState'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ErrorNotice } from './ErrorNotice'


export const Register = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [username, setUsername] = useState();
    const [error, setError] = useState('')

    const {setUserData} = useContext(UserContext)
    const history = useHistory();

    const submitForm = async(e) => {
        e.preventDefault();
        try{
            const newUser = {email, password, passwordCheck, username}

            
            await axios.post('/users/register', newUser);
                        

            const loginRes = await axios.post('users/login', {email, password});

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem('auth-token', loginRes.data.token);
            
            history.push('/')
        } 
        
        catch(err) {
            setError(err.response.data.msg)
        }
    };

    const clearError = () => {
        setError(undefined)
    }
    
    return (
        <div>
            <Nav />
                <div className={Styles.formborder}>
                    {error && <ErrorNotice message={error} clearError = {clearError} />}
                    <form classname={Styles.form} onSubmit={submitForm} >
                        <ul className={Styles.inputarea} >
                            <label htmlFor='register-email'>Email</label>
                            <li><input autoComplete='off' id='register-email' type='email' onChange={e =>setEmail(e.target.value)}/> </li>
                           
                            <label htmlFor='register-password'>Password</label>
                            <li><input id='register-password' type='password' onChange={e =>setPassword(e.target.value)}/> </li>
                            <label htmlfor='confirm-password'>Confirm Password</label>
                            <li><input id='confirm-password' type='password' onChange={e =>setPasswordCheck(e.target.value)}/> </li>
                           
                            <label htmlFor='register-username'>Username</label>
                            <li><input id='register-username' autoComplete='off' type='text' onChange={e =>setUsername(e.target.value)}/> </li>
                            <input type = 'submit' value='Register' className={Styles.formbutton} />
                        </ul>
                    </form>
                </div>
        </div>
       
    )
}



// TO DO
// FORM SHOULD BE FLEX