import React from 'react'
import CompEventInserter from '../../componets/Event/CompEventInserter'
import CompEventUpdater from '../../componets/Event/CompEventUpdater'

export default function PageEventManager() {
    return (
        <>
            <div className='page--event--manager--container'>
                <h1>PageEventManager</h1>
                <CompEventInserter />
                <CompEventUpdater />
            </div>

        </>
    )
}
