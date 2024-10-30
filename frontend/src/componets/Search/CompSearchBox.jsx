import React, { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, Modal } from 'react-bootstrap'
import { GoDash, GoPeople } from 'react-icons/go';
import CompMemberPicker from './CompMemberPicker';
import { MdOutlineCalendarMonth, MdOutlinePlace } from 'react-icons/md';
import { Calendar } from 'primereact/calendar';
import LocationCarousel from '../Carousel/LocationCarousel';
import axios from 'axios';

export default function CompSearchBox(props) {

    //requestParameter(검색한 주소, 날짜, 인원)를 기억할 변수
    const [place, setPlace] = useState(props.place);
    const [check_in, setCheck_in] = useState(props.check_in);
    const [check_out, setCheck_out] = useState(props.check_out);
    const [member, setMember] = useState(props.member);

    //////////////////////////////////////////////////////////for datePicker(Calendar)
    const today = new Date(); //오늘 날짜

    //90일 후 월/연도 계산(for maxDate_check_in: 미리 예약 한도 90일)
    const monthAfter90d = today.getMonth() < 9 ? today.getMonth() + 3 : today.getMonth() - 9; //10월 1일 기점
    const yearAfter90d = today.getMonth() < 9 ? today.getFullYear() : today.getFullYear() + 1; //10월 1일 기점

    //선택 가능한 최대 체크인 날짜(미리 예약 한도 90일)
    const maxDate_check_in = new Date();
    maxDate_check_in.setHours(0, 0, 0, 0);
    maxDate_check_in.setMonth(monthAfter90d);
    maxDate_check_in.setFullYear(yearAfter90d);

    //선택 가능한 최소 체크인 날짜(default: 오늘 또는 내일)
    const minDate_check_in = new Date(); //오늘 날짜
    minDate_check_in.setHours(0, 0, 0, 0); //오늘 날짜의 시간, 분, 초, ms를 모두 0으로 설정
    if (minDate_check_in.getHours() > 17) {   //오늘 18:00 이후
        minDate_check_in.setDate(minDate_check_in.getDate() + 1);
    }


    //선택 가능한 최소 체크아웃 날짜(default: 체크인 다음 날==1박)
    const minDate_check_out_origin = new Date(check_in);
    minDate_check_out_origin.setDate(check_in.getDate() + 1) //체크인 날짜 + 1
    const [minDate_check_out, setMinDate_check_out] = useState(minDate_check_out_origin);

    //선택 가능한 최대 체크아웃 날짜(최대 10연박)
    const maxDate_check_out_origin = new Date(check_in);
    maxDate_check_out_origin.setDate(check_in.getDate() + 10) //체크인 날짜 +10
    const [maxDate_check_out, setMaxDate_check_out] = useState(maxDate_check_out_origin);

    //////////////////////////////////////////////////////////dateTemplate(prop) : specific dates as a parameter to customizing style
    const dateTemplateHandler = (date) => {
        if (check_out.getDate() < check_in.getDate()) {   //체크아웃의 date가 체크인의 date 보다 작다면: 달력이 넘어갔따!!
            if (date.year === check_in.getFullYear() && date.month === check_in.getMonth() && date.day >= check_in.getDate()) {
                return (    //체크인이 속한 달의 체크인 날짜부터 해당 월 말일까지 다 칠한다
                    <div className='period_selected' >{date.day}</div>
                );
            } else if (date.year === check_out.getFullYear() && date.month === check_out.getMonth() && date.day <= check_out.getDate()) {
                return (    //체크아웃이 속한 달의 해당 월 초일부터 체크아웃 날짜까지 다 칠한다
                    <div className='period_selected' >{date.day}</div>
                );
            }
        } else {    //체크아웃의 date가 체크인의 date 보다 작지 않다면: 달력이 넘어가지 않았다
            if (date.year === check_in.getFullYear() && date.month === check_in.getMonth() && date.day >= check_in.getDate() && date.day <= check_out.getDate()) {
                return (
                    <div className='period_selected' >{date.day}</div>
                );
            }
        }
        return date.day;
    }
    //////////////////////////////////////////////////////////dateTemplate(prop) : specific dates as a parameter to customizing style

    // Date() -> "yyyy/MM/dd" (날짜 형식 -> 텍스트 형식 변환 함수)
    const dateFormatter = (rawDate) => (rawDate.getFullYear().toString() + "/" + (rawDate.getMonth() + 1).toString() + "/" + rawDate.getDate().toString());
    //////////////////////////////////////////////////////////for datePicker(Calendar)

    //////////////////////////////////////////////////////////for hidden
    //달력(datePicker) 표시 여부
    //#input_check_in과 #input_check_out 클릭 시, 각각의 달력을 보이고
    //각 달력에서 날짜 선택 시(onSelect) 달력을 숨김
    const [checkInPicker, setCheckInPicker] = useState(false);
    const [checkOutPicker, setCheckOutPicker] = useState(false);

    //인원 선택(memberPicker) 표시 여부
    //#input_member 클릭 시, #input_member 숨기고 CompMemberPicker 보이기
    //CompMemberPickerd에서 '변경' 버튼 클릭 시 반대로
    const [memberPicker, setMemberPicker] = useState(false);
    //////////////////////////////////////////////////////////for hidden
    //////////////////////////////////////////////////////////for location
    const [locationList, setLocationList] = useState([]);

    const getLocationList = async() => {
        try {
            const response = await axios.get('http://localhost:9090/locationMain');
            if(response.status===200) {
                setLocationList(response.data);
            }
        } catch(error) {
            console.log('searchBox locationList: ' + error);
        }
    }

    useEffect(()=> {
        getLocationList();
    }, []);

    //////////////////////////////////////////////////////////for location
    //////////////////////////////////////////////////////////for eventHandler
    //모달이 열릴 때
    const modalOnShow = () => {
        //헤더의 어디(장소, 날짜, 인원 중)를 눌렀는지 확인하여 auto-focusing
        //console.log('focusing at modal: ' + props.focus);
    }

    //모달이 닫힐 때
    const modalOnHide = () => {
    }

    //체크인 날짜를 선택했다
    const checkInHandler = (check_in_selected) => {

        //console.log('selected check IN: ' +  check_in_selected);

        //'Clear' 버튼을 클릭하면 왜 null이 들어오는지????
        if (check_in_selected === null || check_in_selected === '') {
            check_in_selected = minDate_check_in;
        }

        //체크아웃 최소(+1) 상태 변경
        const minDate_check_out_temp = new Date(check_in_selected)
        minDate_check_out_temp.setDate(check_in_selected.getDate() + 1)
        setMinDate_check_out(minDate_check_out_temp);

        //체크아웃 최대(+10) 상태 변경
        const maxDate_check_out_temp = new Date(check_in_selected)
        maxDate_check_out_temp.setDate(check_in_selected.getDate() + 10)
        setMaxDate_check_out(maxDate_check_out_temp);


        //체크인 날짜가 체크아웃날짜보다 뒤인 경우
        if (check_in_selected >= check_out) {
            setCheck_out(minDate_check_out_temp);
        }

        const marginLeft = new Date(check_out);
        marginLeft.setDate(check_out.getDate() - 10)
        //체크인 날짜가 체크아웃날짜-10일 보다 작은 경우(10박을 넘길 경우)
        if (check_in_selected < marginLeft) {
            setCheck_out(maxDate_check_out_temp);
        }
        //결과적으로 체크인 날짜는 선택한 날짜로 지정
        setCheck_in(check_in_selected);
    }

    const keyHandler = (event) => {  //엔터키 누르면 '검색' 클릭 실행
        //console.log(event.target.value);
        if (event.key === 'Enter') {
            searchHandler();
        }
    }

    //'검색' 버튼 클릭!
    const searchHandler = async () => {
        //console.log('@CompSearchBox place: ' + place + '/' + check_in + '-' + check_out + '/' + member);
        window.location.href = `/hotelList?place=${place}&check_in=${check_in}&check_out=${check_out}&member=${member}`;
    }
    //////////////////////////////////////////////////////////for eventHandler


    return (
        <>
            <Modal onShow={modalOnShow} onHide={modalOnHide} onKeyUp={keyHandler}
                className='comp--search--box-container'
                {...props}
                fullscreen={true}
            >
                <Modal.Header id="header_searchBox" closeButton>
                    <Modal.Title id="title_modal" >호텔 검색</Modal.Title>
                </Modal.Header>

                <Modal.Body id="body_searchBox">
                    <Form >

                        <InputGroup className='mb-3'>
                            <InputGroup.Text ><MdOutlinePlace size="24" /></InputGroup.Text>
                            <Form.Control
                                id="input_place"
                                type="search"
                                placeholder="지역 또는 호텔 이름을 입력하세요."
                                value={place}
                                onChange={(event) => setPlace(event.target.value)}
                                autoFocus={props.focus === "input_place" ? true : false}
                            />
                        </InputGroup>

                        <div id="container_period_input" className="d-flex align-items-center mb-3">
                            <InputGroup>
                                <InputGroup.Text ><MdOutlineCalendarMonth size="24" /></InputGroup.Text>
                                <Form.Control
                                    id="input_check_in"
                                    type="text"
                                    placeholder="체크인"
                                    value={dateFormatter(check_in)}
                                    readOnly
                                    onClick={() => setCheckInPicker(!checkInPicker)}
                                    autoFocus={props.focus === "input_period" ? true : false}
                                />
                            </InputGroup>

                            <GoDash size="24" id="seperator_period" />

                            <InputGroup>
                                <InputGroup.Text ><MdOutlineCalendarMonth size="24" /></InputGroup.Text>
                                <Form.Control
                                    id="input_check_out"
                                    type="text"
                                    placeholder="체크아웃"
                                    value={dateFormatter(check_out)}
                                    readOnly
                                    onClick={() => setCheckOutPicker(!checkOutPicker)}
                                />
                            </InputGroup>
                        </div>

                        <div id="container_period_calendar">
                            <Calendar id="calendar_check_in" className="calendar mb-3"
                                inline
                                showButtonBar
                                hidden={!checkInPicker ? true : false}
                                //onSelect={() => setCheckInPicker(!checkInPicker)}
                                value={check_in}
                                minDate={minDate_check_in}
                                maxDate={maxDate_check_in}
                                dateTemplate={dateTemplateHandler}
                                onChange={(e) => checkInHandler(e.value)}
                                onTodayButtonClick={() => checkInHandler(minDate_check_in)}
                                onClearButtonClick={() => checkInHandler(minDate_check_in)}
                            />
                            <Calendar id="calendar_check_out" className="calendar mb-3"
                                inline
                                showButtonBar
                                hidden={!checkOutPicker ? true : false}
                                //onSelect={() => setCheckOutPicker(!checkOutPicker)}
                                value={check_out}
                                minDate={minDate_check_out}
                                maxDate={maxDate_check_out}
                                dateTemplate={dateTemplateHandler}
                                onChange={(e) => setCheck_out(e.value)}
                                onClearButtonClick={() => setCheck_out(minDate_check_out)}
                            />
                        </div>

                        <InputGroup className={`${memberPicker ? "trans_hidden" : ""} mb-3`}>
                            {/* hidden={memberPicker ? true : false} */}
                            <InputGroup.Text ><GoPeople size="24" /></InputGroup.Text>
                            <Form.Control
                                id="input_member"
                                type="text"
                                placeholder="인원"
                                value={'인원 ' + member + '명'}
                                readOnly
                                // onChange={(event) => setMember(event.target.value)} 
                                // 여기서는 값이 바뀔 일이 없네?(readOnly), 값이 바뀌명 '인원' + '명'까지 member에 들어감
                                autoFocus={props.focus === "input_member" ? true : false}
                                onClick={() => setMemberPicker(!memberPicker)}
                            />
                        </InputGroup>

                        <CompMemberPicker
                            hidden={!memberPicker ? true : false}
                            member={member}
                            callParent={(memberFromChild) => setMember(memberFromChild)}
                            confirmMember={() => setMemberPicker(!memberPicker)}
                        />

                        <div className="w-100">
                            <LocationCarousel locationList={locationList} check_in={check_in} check_out={check_out} member={member}/>
                        </div>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Container id="container_btn_search">
                        <Button id="btn_search" variant="primary" onClick={searchHandler}>검색</Button>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )
}