import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import { IoCheckmark } from "react-icons/io5";

export default function RoomFilterModal({show, handleClose, rooms, basicRoom}) {

    const [select, Setselect] = useState(basicRoom)

    const click = (room) => {
        Setselect(room);
    }
    

  return (
    
    <Modal show={show} onHide={handleClose} keyboard={false} fullscreen={true} className='room--filter--modal'>
        <Modal.Header closeButton>객실 선택</Modal.Header>
        <Modal.Body scrollable={true} >
            <div className='roomDiv'>
                <div className='allRoom'>
                    {select === '객실전체' ? (
                        <span className='allRoomContent'  style={{ color: 'red' }}>객실전체 <IoCheckmark/></span>
                    ) : (
                        <span className='allRoomContent' onClick={() => click('객실전체')}>객실전체</span>
                    )}
                    
                </div>
                {rooms.map((room,idx) => (
                    <div className='Rooms'>
                        {select === idx ? (
                            <span className='RoomsContent'  style={{ color: 'red' }}>{room} <IoCheckmark/></span>
                        ) : (
                            <span className='RoomsContent' onClick={() => click(idx)}>{room}</span>
                        )}
                        
                    </div>
                ))}
            </div>
        </Modal.Body>
    </Modal>
  )
}
