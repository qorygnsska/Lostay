import React, { useEffect } from 'react'

export default function Toast({ setToast, text }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 1500);
        return () => {
            clearTimeout(timer);
        };
    }, [setToast]);

    return (
        <div className='toast--container'>
            <div className='toast--text'>
                <span>{text}</span>
            </div>
        </div>
    )
}
