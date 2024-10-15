import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function CompEventInserter(props) {


    //모달 컴포넌트 jsx at /Admin
    //inserterFunc jsx at /Admin
    //updaterterFunc jsx at /Admin


    return (
        <>
            <Modal className='comp--event--inserter--container'
                {...props}
                size="lg"
                centered
                backdrop="static"   // will not close when clicking outside modal
            >
                <Modal.Header closeButton>
                    <Modal.Title id="title_modal">
                        이벤트 추가
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="input_title">
                            <Form.Label>이벤트 제목</Form.Label>
                            <Form.Control
                                type="text"
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
                    <Button variant="outline-success" >추가하기</Button>
                </Modal.Footer>
            </Modal>




        </>

    )
}
