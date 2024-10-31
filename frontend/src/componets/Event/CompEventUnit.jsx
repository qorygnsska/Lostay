import React from 'react'

export default function CompEventUnit(props) {

    return (
        <>
            <div className='comp--event--unit--container'>
                {/* src: process.env.PUBLIC_URL+props.thumbnail */}
                <img id={`event_${props.no}`} src={process.env.PUBLIC_URL+'/'+props.thumbnail} alt={props.title} />
            </div>

        </>
    )
}
