import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './OkCancleModal.css'; // CSS 파일을 import

export default function OkCancleModal({ show, onClose, content, cancelOk }) {
    return (

        <Modal show={show} onHide={onClose} animation={false} centered size="sm" className='okCancleModal--container'>
            <Modal.Body>
                <div className='content--text'>
                    {content}
                </div>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="primary" onClick={cancelOk}>
                    확인
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
