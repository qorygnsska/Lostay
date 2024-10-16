import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'

export default function CompSearchBox(props) {




    return (
        <>

            <Modal
                className='comp--search--box-container'
                {...props}
                fullscreen={true}
            >
                <Modal.Header id="header_searchBox" closeButton>
                    <Modal.Title id="title_modal" >호텔 검색</Modal.Title>
                </Modal.Header>

                <Modal.Body id="body_searchBox">
                    <Form>
                        <Form.Control
                            id="input_place"
                            className='mb-3'
                            type="text"
                            placeholder="지역 또는 호텔명을 입력하세요"
                            autoFocus
                        />
                        <Form.Control
                            id="input_period"
                            className='mb-3'
                            type="text"
                            placeholder="숙박기간"
                        />
                        <Form.Control
                            id="input_member"
                            type="text"
                            placeholder="인원"
                        />
                    </Form>

                    <Container id="container_btn_search">
                        <Button id="btn_search" variant="primary" >검색</Button>
                    </Container>

                </Modal.Body>
            </Modal>
        </>
    )
}
