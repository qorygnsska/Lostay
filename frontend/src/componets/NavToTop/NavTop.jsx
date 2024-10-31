import React, { useState } from 'react'
import { GrLinkTop } from 'react-icons/gr'

export default function NavTop() {

    const [hideBtn, setHideBtn] = useState(true);

    window.addEventListener('scroll', function() {

        if(window.scrollY > 1000) {
            setHideBtn(false);
        } else {
            setHideBtn(true);
        }
    });

    const goToTheTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <div className='nav--top--container' hidden={hideBtn}>
                <button id="nav_to_top" onClick={goToTheTop}><GrLinkTop size="24" /></button>
            </div>
        </>
    )
}
