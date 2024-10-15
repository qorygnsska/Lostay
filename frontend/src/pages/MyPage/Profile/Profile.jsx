import React from 'react'
import BackNav from '../../../componets/BackNav/BackNav';
import Navbar from '../../../componets/Navbar/Navbar';

export default function Profile() {
    return (
        <div className='profile--container'>
            <div>
                <BackNav title='내 정보 관리' />
            </div>


            <div>
                <Navbar />
            </div>
        </div>
    )
}
