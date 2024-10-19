import React from 'react'

export default function MyPoint({ pointData }) {
    return (
        <div className='mypoint--component--container'>
            <div className='mypoint--wrap'>
                <span className='point--day'>{pointData.day}</span>

                <div className='mypoint--use'>
                    <div className='mypoint--title'>
                        <span>{pointData.pointTitle}</span>
                        <span className='point--fulldate'>{pointData.fullDate}</span>
                    </div>

                    <div>
                        <span className={pointData.pointPlusMinus > 0 ? 'plus' : 'minus'}>{pointData.pointPlusMinus.toLocaleString()}<span className='point--unit'>P</span></span>
                    </div>
                </div>


            </div>
        </div>
    )
}
