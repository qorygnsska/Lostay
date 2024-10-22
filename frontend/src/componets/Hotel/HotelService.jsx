import React from 'react'

import { IoCheckmark } from "react-icons/io5";

export default function HotelService({services}) {
  return (
    <div className='hotel--service--container'>
        <div className='HotelServices'>
                {services.map(service => (
                    <div className='HotelService'><IoCheckmark /> {service}</div>
                ))}
            </div>
    </div>
  )
}
