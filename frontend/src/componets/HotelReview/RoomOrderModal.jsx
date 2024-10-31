import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import { IoCheckmark } from "react-icons/io5";

export default function RoomOrderModal({ show, handleClose, Orders, sort, ClickOrder }) {


  return (

    <Modal show={show} onHide={handleClose} keyboard={false} fullscreen={true} className='room--order--modal'>
      <Modal.Header closeButton>정렬</Modal.Header>

      <div className='orderDiv'>
        {Orders.map((order, idx) => (
          <div className='Orders' key={idx}>
            {sort === order ? (
              <span className='OrdersContent' style={{ color: 'red' }}>{order} <IoCheckmark /></span>
            ) : (
              <span className='OrdersContent' onClick={() => ClickOrder(order)}>{order}</span>
            )}

          </div>
        ))}
      </div>

    </Modal>
  )
}
