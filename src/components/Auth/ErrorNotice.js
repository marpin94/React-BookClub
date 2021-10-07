import React from 'react'
import Styles from './ErrorNotice.module.css'

export const ErrorNotice = ({message, clearError}) => {
    return (
        <div className={Styles.error}>
            <p>{message}</p>
            <button onClick={()=>clearError()} className={Styles.errorbutton}>X</button>
        </div>
    )
}
