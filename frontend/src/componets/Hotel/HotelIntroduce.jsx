import React from 'react'

import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

export default function HotelIntroduce({introduce}) {
    return (
        <div className='hotel--introduce--container'>
            <div className='HotelIntro'>
                <div className='Double1'><RiDoubleQuotesL /></div>
                <div className='IntroContent'>
                    {introduce}
                </div>
                <div className='Double2'><RiDoubleQuotesR /></div>
            </div>
        </div>
    )
}
