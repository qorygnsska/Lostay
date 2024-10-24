import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './OkCancleModal.css'; // CSS 파일을 import

export default function OkCancleModal({ show, handleClose, content, cancelOk }) {
    return (

        <Modal show={show} onHide={handleClose} animation={false} centered size="sm" className='okCancleModal--container'>
            <Modal.Body>
                <div className='content--text'>
                    {content}
                </div>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" onClick={cancelOk}>
                    확인
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
