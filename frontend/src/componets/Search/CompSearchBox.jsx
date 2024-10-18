import React, { useState } from 'react'
import { Button, Container, Form, InputGroup, Modal } from 'react-bootstrap'
import { GoDash, GoPeople } from 'react-icons/go';
import CompMemberPicker from './CompMemberPicker';
import { MdOutlineCalendarMonth, MdOutlinePlace } from 'react-icons/md';

export default function CompSearchBox(props) {


    const [place, setPlace] = useState(props.place);
    const [check_in, setCheck_in] = useState(props.check_in);
    const [check_out, setCheck_out] = useState(props.check_out);
    const [member, setMember] = useState(props.member);

    const modalOnShow = () => {
        //모달이 열릴 때마다 어디를 클릭해서 열리는지 확인하여 auto-focusing
        //console.log('focusing at modal: ' + props.focus);

    }


    //CompCalendarPicker
    



    //#input_member 클릭 시, #input_member 숨기고 CompMemberPicker 보이기
    //CompMemberPickerd에서 '변경' 버튼 클릭 시 반대로
    const [memberPicker, setMemberPicker] = useState(false);
    const handleMemberPicker = () => {
        setMemberPicker(!memberPicker);
    }



    const handleSearch = () => {
        //'검색' 버튼 클릭!
        console.log('search: ' + place + '/' + check_in + '-' + check_out + '/' + member);
        //쿼리 날리고 페이지 이동 to /hotelList

    }


    return (
        <>
            <Modal onShow={modalOnShow}
                className='comp--search--box-container'
                {...props}
                fullscreen={true}
            >
                <Modal.Header id="header_searchBox" closeButton>
                    <Modal.Title id="title_modal" >호텔 검색</Modal.Title>
                </Modal.Header>

                <Modal.Body id="body_searchBox">
                    <Form>

                        <InputGroup className='mb-3'>
                            <InputGroup.Text ><MdOutlinePlace size="24" /></InputGroup.Text>
                            <Form.Control
                                id="input_place"
                                type="search"
                                placeholder="지역 또는 호텔명을 입력하세요"
                                value={place}
                                onChange={(event) => setPlace(event.target.value)}
                                autoFocus={props.focus == "input_place" ? true : false}
                            />
                        </InputGroup>

                        <div id="container_period" className='d-flex'>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text ><MdOutlineCalendarMonth size="24" /></InputGroup.Text>
                                <Form.Control
                                    id="input_check_in"
                                    type="date"
                                    placeholder="체크인"
                                    value={check_in}
                                    onChange={(event) => setCheck_in(event.target.value)}
                                    autoFocus={props.focus == "input_period" ? true : false}
                                />
                            </InputGroup>

                            <GoDash size="24" id="seperator_period" />

                            <InputGroup className='mb-3'>
                            <InputGroup.Text ><MdOutlineCalendarMonth size="24" /></InputGroup.Text>
                            <Form.Control
                                id="input_check_out"
                                type="date"
                                placeholder="체크아웃"
                                value={check_out}
                                onChange={(event) => setCheck_out(event.target.value)}
                            />
                            </InputGroup>
                        </div>

                        <InputGroup hidden={memberPicker ? true : false}>
                            <InputGroup.Text ><GoPeople size="24" /></InputGroup.Text>
                            <Form.Control
                                id="input_member"
                                type="text"
                                placeholder="인원"
                                value={'인원 '+member+'명'}
                                readOnly
                                // onChange={(event) => setMember(event.target.value)} 여기서는 값이 바뀔 일이 없네?(readOnly)
                                autoFocus={props.focus == "input_member" ? true : false}
                                onClick={() => handleMemberPicker()}
                            />
                        </InputGroup>

                        <CompMemberPicker
                            hidden={!memberPicker ? true : false}
                            member={member}
                            callParent={(memberFromChild) => setMember(memberFromChild)}
                            confirmMember={() => setMemberPicker(!memberPicker)}
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
