import React, { useContext } from 'react'
import Styles from './Home.module.css'
import {Quotes} from './Quotes'

import UserContext from '../context/GlobalState'
import { Nav } from './Nav'

export const Home = () => {

    const {userData, setUserData} = useContext(UserContext)

    const quote = Quotes[Math.floor(Math.random()*Quotes.length)]


    return (
        <>
            <Nav />
            
            <div className = {Styles.main}>
                <div>
                    <h2> Welcome to Book Club! </h2>
                    <p> Please log in or register to start recording you reading. </p>
                </div>
                <div className={Styles.quote}>
                    <p>{quote.quote}</p>
                    <p>-{quote.credit}</p>
                </div>
            </div>
        </>    
    )
}
