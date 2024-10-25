import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import { IoCheckmark } from "react-icons/io5";

export default function RoomOrderModal({ show, handleClose, Orders, Basicorder }) {

  const [orders, Setorders] = useState(Basicorder)

  const click = (order) => {
    Setorders(order);
  }




  return (

    <Modal show={show} onHide={handleClose} keyboard={false} fullscreen={true} className='room--order--modal'>
      <Modal.Header closeButton>정렬</Modal.Header>

      <div className='orderDiv'>
        {Orders.map(order => (
          <div className='Orders'>
            {orders === order ? (
              <span className='OrdersContent' style={{ color: 'red' }}>{order} <IoCheckmark /></span>
            ) : (
              <span className='OrdersContent' onClick={() => click(order)}>{order}</span>
            )}

          </div>
        ))}
      </div>

    </Modal>
  )
}
