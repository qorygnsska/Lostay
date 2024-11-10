import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import { IoCheckmark } from "react-icons/io5";

export default function RoomFilterModal({show, handleClose, rooms, ChoiceRoom, ClickRoom}) {


    
  return (
    
    <Modal show={show} onHide={handleClose} keyboard={false} fullscreen={true} className='room--filter--modal'>
        <Modal.Header closeButton>객실 선택</Modal.Header>
        <Modal.Body scrollable={true} >
            <div className='roomDiv'>
                <div className='allRoom'>
                    {ChoiceRoom === '객실 전체' ? (
                        <span className='allRoomContent'  style={{ color: 'red' }}>객실 전체 <IoCheckmark/></span>
                    ) : (
                        <span className='allRoomContent' onClick={() => ClickRoom('객실 전체', '0')}>객실 전체</span>
                    )}
                    
                </div>
                {rooms.map((room,idx) => {
                    const matchingRoom = rooms.find(hotelRoom => hotelRoom.roomName === room.roomName);
                    const roomNo = matchingRoom ? matchingRoom.roomNo : null;

                    return(
                        <div className='Rooms' key={idx}>
                            {ChoiceRoom === room.roomName ? (
                                <span className='RoomsContent'  style={{ color: 'red' }}>{room.roomName} <IoCheckmark/></span>
                            ) : (
                                <span className='RoomsContent' onClick={() => ClickRoom(room.roomName, String(roomNo))}>{room.roomName}</span>
                            )}
                            
                        </div>
                    );
                })}
            </div>
        </Modal.Body>
    </Modal>
  )
}
