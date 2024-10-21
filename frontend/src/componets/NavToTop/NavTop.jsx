import React from 'react'
import { GrLinkTop } from 'react-icons/gr'

export default function NavTop() {

    const goToTheTop = () => {
        window.scrollTo({top: 0, behavior:'smooth'})
    }

    return (
        <>
            <div className='nav--top--container'>
                <button id="nav_to_top" onClick={goToTheTop}><GrLinkTop size="24"/></button>
            </div>
        </>
    )
}
