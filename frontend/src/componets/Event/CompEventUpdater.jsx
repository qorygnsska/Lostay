import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function CompEventUpdater(props) {



    return (
        <>
            <Modal className='comp--event--updater--container comp--event--manager--modal'
                {...props}
                size="lg"
                centered
                backdrop="static"   // will not close when clicking outside modal
            >
                <Modal.Header closeButton>
                    <Modal.Title id="title_modal">
                        이벤트 수정
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="input_title">
                            <Form.Label>이벤트 제목</Form.Label>
                            <Form.Control
                                type="search"
                                placeholder="이벤트 제목을 입력하세요."
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input_period">
                            <Form.Label>이벤트 기간</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="이벤트기간"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input_file">
                            <Form.Label>이벤트 사진</Form.Label>
                            <Form.Control type='file' size='sm' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button hidden onClick={props.onHide}>Close</Button>
                    <Button variant="outline-danger" >수정하기</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
