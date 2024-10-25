import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Calendar } from 'primereact/calendar';

export default function CompEventUpdater(props) {

    
    //default period: [create_at, end_at]
    const today = new Date(); //오늘 날짜
    const create_at = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1
    const end_at = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1 + 1

    //초기값은 props에서 받아오기
    const [title, setTitle] = useState('');
    const [period, setPeriod] = useState([create_at, end_at]);
    //파일은 비워두기
    const [thumbnail, setThumbnail] = useState('');
    const [image, setImage] = useState('');
    
    
    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)
    //달력 보였다 숨겼다
    const [periodPicker, setPeriodPicker] = useState(false);

    const dateFormatter = (rawDate) => (rawDate.getFullYear().toString() + "/" + (rawDate.getMonth() + 1).toString() + "/" + rawDate.getDate().toString());
    
    const periodFormatter = (period_selected) => {
        if (period_selected == null || period_selected == '') {
            return null;
        } else if (period_selected[1] == null) {
            return dateFormatter(period[0]);
        } else {
            return dateFormatter(period[0]) + ' - ' + dateFormatter(period[1]);
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)
    

    //모달 열릴 때, 해당 이벤트 정보 불러오기
    function getEventInfo() {
        //console.log(props.picked + 'is opening');
        
        fetch(`http://localhost:9090/adminEventDetail?eventNo=${props.picked}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTitle(data.eventTitle);

            const neoC = new Date(data.eventCreateAt);
            const neoE = new Date(data.eventEndAt);
            setPeriod([neoC, neoE])

            setThumbnail(data.eventThumbnail)
            setImage(data.eventImg)
        })
        .catch(error => {
            console.log(error);
            alert('이벤트 정보를 불러올 수 없습니다.');
            dismissHandler();//모달 닫기
        })
    }


    //'닫기' 버튼 클릭 시(onHide), 모든 값 초기화하고 모달 숨김
    function dismissHandler() {
        setTitle('');
        setPeriod([create_at, end_at]);
        setThumbnail('');
        setImage('');
        props.onHide();
    }


    //이벤트 등록 실행
    const insertHandler = () => {

        //쿼리 날릴 때 setter는 의미없음(reRendering에 필요할 뿐)
        //setThumbnail(thumbnail.substring(thumbnail.lastIndexOf('\\')+1));
        //setImage(image.substring(image.lastIndexOf('\\')+1))
        if (window.confirm('정말 수정?')) {

            console.log("수정: " + title + '/' + period + '/' + thumbnail.substring(thumbnail.lastIndexOf('\\')+1) + '/' + image.substring(image.lastIndexOf('\\')+1));

        }


    }

    return (
        <>
            <Modal className='comp--event--updater--container comp--event--manager--modal'
                {...props}
                size="lg"
                centered
                backdrop="static"   // will not close when clicking outside of the modal
                onShow={getEventInfo}
                onHide={dismissHandler}
            >
                <Modal.Header closeButton>
                    {/* closeButton 클릭 => onHide={dismissHandler} 실행 */}
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input_period">
                            <Form.Label>이벤트 기간</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="이벤트기간"
                                value={periodFormatter(period)}
                                readOnly
                                onClick={() => setPeriodPicker(!periodPicker)}
                            />
                        </Form.Group>
                        <div id="container_period_picker" className="d-flex justify-content-center">
                            <Calendar 
                                className="calendar mb-3"
                                inline
                                showButtonBar
                                selectionMode="range"
                                value={period}
                                onChange={(e) => setPeriod(e.value)}
                                //onClearButtonClick={() => setPeriod([create_at, end_at])}
                                hidden={!periodPicker ? true : false}
                            />
                        </div>
                        <Form.Group className="mb-3" controlId="input_thumbnail">
                            <Form.Label>이벤트 섬네일</Form.Label>
                            <Form.Control
                                type='file'
                                size='sm'
                                value={''}
                                onChange={(e) => setThumbnail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input_image">
                            <Form.Label>이벤트 이미지</Form.Label>
                            <Form.Control
                                type='file'
                                size='sm'
                                value={''}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button hidden onClick={dismissHandler}>Close</Button> */}
                    <Button onClick={insertHandler} variant="outline-danger" >수정하기</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
