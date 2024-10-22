import React from 'react'

export default function CompEventUnit(props) {

    return (
        <>
            <div className='comp--event--unit--container'>
                <img id={`event_${props.no}`} src={props.thumbnail} alt={props.title} />
            </div>

        </>
    )
}
