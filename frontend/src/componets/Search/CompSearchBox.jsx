import React, { useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { GoDash } from 'react-icons/go';

export default function CompSearchBox(props) {



    const [place, setPlace] = useState(props.place);
    const [check_in, setCheck_in] = useState(props.check_in);
    const [check_out, setCheck_out] = useState(props.check_out);
    const [member, setMember] = useState(props.member);


    const handleSearch = () => {    
        //'검색' 버튼 클릭!
        console.log('search: '+place+'/'+check_in+'-'+check_out+'/'+member);
        
    }


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
                            value={place}
                            onChange={(event) => setPlace(event.target.value)}
                            autoFocus
                        />

                        <div id="container_period" className='d-flex'>
                        <Form.Control
                            id="input_check_in"
                            className='mb-3'
                            type="text"
                            placeholder="체크인"
                            value={check_in}
                            onChange={(event) => setCheck_in(event.target.value)}
                        />
                        <GoDash id="seperator_period" size="24"/>
                        <Form.Control
                            id="input_check_out"
                            className='mb-3'
                            type="text"
                            placeholder="체크아웃"
                            value={check_out}
                            onChange={(event) => setCheck_out(event.target.value)}
                        />
                        </div>

                        <Form.Control
                            id="input_member"
                            type="text"
                            placeholder="인원"
                            value={member}
                            onChange={(event) => setMember(event.target.value)}
                        />
                    </Form>

                    <Container id="container_btn_search">
                        <Button id="btn_search" variant="primary" onClick={handleSearch}>검색</Button>
                    </Container>

                </Modal.Body>
            </Modal>
        </>
    )
}
