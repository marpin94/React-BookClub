import React from 'react'


export const FilterButton = (props) => {
    return (
        <option value={props.name}>
            {props.name}   
        </option>
    )
}
