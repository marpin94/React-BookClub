import React, {useContext, useState} from 'react'
import {Nav} from  '../../components/Nav'
import Styles from './Login.module.css'

import UserContext from '../../context/GlobalState'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { ErrorNotice } from './ErrorNotice'


export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('')
 
    const {setUserData} = useContext(UserContext)
    const history = useHistory();

    const submitForm = async(e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password}
            await axios.post('/users/login', loginUser);

            const loginRes = await axios.post('users/login', {email, password});

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/')
        } catch(err) {
            setError(err.response.data.msg)
        }
    }

    const clearError = () => {
        setError(undefined)
    }
    return (
        <div>
            <Nav />
                    <div className={Styles.formborder} >
                        {error && <ErrorNotice message={error} clearError={clearError} />}
                            <form className={Styles.form} onSubmit={submitForm} >
                                <ul className={Styles.inputarea}>
                                    <label htmlFor='login-email'>Email</label>
                                    <li><input id='login-email' type='email' onChange={e =>setEmail(e.target.value)} autoComplete='off'/> </li>
                                    <br/>
                                    <label htmlFor='login-password'>Password</label>
                                    <li><input id='login-password' type='password' onChange={e =>setPassword(e.target.value)}/> </li>
                                    <input type = 'submit' value='Login' className={Styles.formbutton} />
                                </ul>
                            </form>
                    </div>
        </div>
   
    )
}
