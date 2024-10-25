import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReImgModal from './ReImgModal'



export default function AllImgModal({imgs, show, handleClose}) {

    const[ImgIdx, setImgIdx] = useState(0);

    const click = (idx) => {
        setImgIdx(idx);
        setShows(true);
    }

    const [shows, setShows] = useState(false);
    const handleCloses = () => setShows(false);


    return (
        <Modal show={show} onHide={handleClose} keyboard={false} fullscreen={true} scrollable={true} className='allimg--modal--container'>
            <Modal.Header closeButton>숙소 리뷰사진({imgs.length})</Modal.Header>
            <div className='RowLine'></div>
            <div className='ImgGrid'>
                {imgs.map((img, idx) => (
                    <img src={img} key={idx} alt='이미지' className='imgs' onClick={() => click(idx)} />
                ))}
            </div>

            <ReImgModal imgs={imgs} ImgIdx={ImgIdx} show={shows} handleClose={handleCloses}/>
        </Modal>

        
    )
}
