import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function BusModal({ show, handleClose, road, formatTime }) {

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(prev => !prev);
  };


  return (
    <Modal show={show} onHide={handleClose} keyboard={false} size='lg' scrollable={true} className={`bus--modal--container ${collapsed ? 'collapsed' : ''}`}>
        <Modal.Header closeButton>
          <div className='totalTime'>{formatTime(road.totalTime)}</div>
          {!collapsed && 
          <div className='subInfo'>
            <div>도보 {formatTime(road.totalWalkTime)}</div>
            <div>요금 {road.fare.regular.totalFare.toLocaleString()}원</div>
            <div>환승 {road.transferCount}회</div>                    
          </div>
          }

          <Button variant="link" onClick={toggleCollapse} className="collapse-toggle">
            {collapsed ? '경로설명' : '지도보기'}
          </Button>
        </Modal.Header>
        
        <div>

        </div>
    </Modal>
  )
}
