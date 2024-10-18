import React, { useState } from 'react'
import { Button, Container, Form, InputGroup, Modal } from 'react-bootstrap'
import { GoDash, GoPeople } from 'react-icons/go';
import CompMemberPicker from './CompMemberPicker';
import { MdOutlineCalendarMonth, MdOutlinePlace } from 'react-icons/md';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-cyan/theme.css";



export default function CompSearchBox(props) {


    const [place, setPlace] = useState(props.place);
    const [check_in, setCheck_in] = useState(props.check_in);
    const [check_out, setCheck_out] = useState(props.check_out);
    const [member, setMember] = useState(props.member);

    const modalOnShow = () => {
        //모달이 열릴 때마다 어디를 클릭해서 열리는지 확인하여 auto-focusing
        //console.log('focusing at modal: ' + props.focus);

    }


    //for datePicker(Calendar)
    const today = new Date(); //오늘 날짜

    //90일 후 월/연도(미리 예약 한도)
    const monthAfter90d = today.getMonth() < 9 ? today.getMonth() + 3 : today.getMonth() - 9; //10월 1일 기점
    const yearAfter90d = today.getMonth() < 9 ? today.getFullYear() : today.getFullYear() + 1; //10월 1일 기점

    //선택 가능한 최대 체크인 날짜
    const maxDate_check_in = new Date();
    maxDate_check_in.setMonth(monthAfter90d);
    maxDate_check_in.setFullYear(yearAfter90d);

    //선택 가능한 최소 체크인 날짜
    const minDate_check_in = new Date(); //오늘 날짜
    if (minDate_check_in.getHours() > 17) {   //오늘 18:00 이후
        minDate_check_in.setDate(minDate_check_in.getDate() + 1) //오늘 날짜 + 1
    }

    //선택 가능한 최소 체크아웃 날짜(체크인 다음 날)
    const minDate_check_out = new Date(check_in);
    minDate_check_out.setDate(check_in.getDate() + 1) //체크인 날짜 + 1

    //선택 가능한 최대 체크아웃 날짜(최대 10연박)
    const maxDate_check_out = new Date(check_in);
    maxDate_check_out.setDate(check_in.getDate() + 10) //체크인 날짜 +10


    //#input_check_in과 #input_check_out 클릭 시, 각각의 달력을 보이고
    //각 달력에서 날짜 선택 시(onSelect) 달력을 숨김
    const [checkInPicker, setCheckInPicker] = useState(false);
    const [checkOutPicker, setCheckOutPicker] = useState(false);




    //#input_member 클릭 시, #input_member 숨기고 CompMemberPicker 보이기
    //CompMemberPickerd에서 '변경' 버튼 클릭 시 반대로
    const [memberPicker, setMemberPicker] = useState(false);


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

                        <div id="container_period_input" className='d-flex align-items-center mb-3'>
                            <InputGroup>
                                <InputGroup.Text ><MdOutlineCalendarMonth size="24" /></InputGroup.Text>
                                <Form.Control
                                    id="input_check_in"
                                    type="text"
                                    placeholder="체크인"
                                    value={check_in}
                                    readOnly
                                    // onChange={(event) => setCheck_in(event.target.value)}
                                    onClick={() => setCheckInPicker(!checkInPicker)}
                                    autoFocus={props.focus == "input_period" ? true : false}
                                />
                            </InputGroup>

                            <GoDash size="24" id="seperator_period" />

                            <InputGroup>
                                <InputGroup.Text ><MdOutlineCalendarMonth size="24" /></InputGroup.Text>
                                <Form.Control
                                    id="input_check_out"
                                    type="text"
                                    placeholder="체크아웃"
                                    value={check_out}
                                    readOnly
                                    //onChange={(event) => setCheck_out(event.target.value)}
                                    onClick={() => setCheckOutPicker(!checkOutPicker)}

                                />
                            </InputGroup>
                        </div>

                        <div id="container_period_calendar">
                            <Calendar id="calendar_check_in" className="calendar mb-3"
                                showButtonBar
                                hidden={!checkInPicker ? true : false}
                                value={check_in}
                                onClearButtonClick={() => setCheck_in(minDate_check_in)}
                                onSelect={() => setCheckInPicker(!checkInPicker)}
                                onChange={(e) => setCheck_in(e.value)}
                                minDate={minDate_check_in}
                                maxDate={maxDate_check_in}
                                inline
                            />
                            <Calendar id="calendar_check_out" className="calendar mb-3"
                                showButtonBar
                                hidden={!checkOutPicker ? true : false}
                                value={check_out}
                                onClearButtonClick={() => setCheck_out(minDate_check_out)}
                                onSelect={() => setCheckOutPicker(!checkOutPicker)}
                                onChange={(e) => setCheck_out(e.value)}
                                minDate={minDate_check_out}
                                maxDate={maxDate_check_out}
                                inline
                            />
                        </div>


                        <InputGroup hidden={memberPicker ? true : false}>

                            <InputGroup.Text ><GoPeople size="24" /></InputGroup.Text>
                            <Form.Control
                                id="input_member"
                                type="text"
                                placeholder="인원"
                                value={'인원 ' + member + '명'}
                                readOnly
                                // onChange={(event) => setMember(event.target.value)} 
                                // 여기서는 값이 바뀔 일이 없네?(readOnly), 값이 바뀌명 '인원' + '명'까지 member에 들어감
                                autoFocus={props.focus == "input_member" ? true : false}
                                onClick={() => setMemberPicker(!memberPicker)}
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
