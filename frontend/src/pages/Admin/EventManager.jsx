import React from 'react'
import EventInsert from '../../componets/Event/EventInsert'
import EventUpdate from '../../componets/Event/EventUpdate'

import './AdminPage.css'

export default function EventManager() {






  return (

    <div className='page_admin_event'>
      <h1>EventManager</h1>
      <EventInsert />
      <EventUpdate />
    </div>



  )
}
