import React from 'react'
import { Modal } from 'react-bootstrap'

export default function BusModal({ show, handleClose, road, formatTime }) {


  return (
    <Modal show={show} onHide={handleClose} keyboard={false} fullscreen={true} scrollable={true} className='bus--modal--container'>
        <Modal.Header closeButton>
        <div className='totalTime'>{formatTime(road.totalTime)}</div>                                
        <div>도보 {formatTime(road.totalWalkTime)}</div>
        <div>요금 {road.fare.regular.totalFare.toLocaleString()}원</div>
        <div>환승 {road.transferCount}회</div>
                                        
        </Modal.Header>
        BusModal
    </Modal>
  )
}
