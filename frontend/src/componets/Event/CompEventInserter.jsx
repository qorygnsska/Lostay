import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Calendar } from 'primereact/calendar';

export default function CompEventInserter(props) {


    const today = new Date(); //오늘 날짜

    //default period: [start_at, end_at]
    const start_at = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1
    const end_at = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1 + 1


    const [title, setTitle] = useState('');
    const [period, setPeriod] = useState([start_at, end_at]);
    const [thumbnail, setThumbnail] = useState('');
    const [image, setImage] = useState('');


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


    const [periodPicker, setPeriodPicker] = useState(false);

    //'닫기' 버튼 클릭 시(onHide), 모든 값 초기화하고 모달 숨김
    const dismissHandler = () => {
        setTitle('');
        setPeriod([start_at, end_at]);
        setThumbnail('');
        setImage('');
        props.onHide();
    }


    //이벤트 등록 실행
    const insertHandler = async () => { // *****async function

        console.log(title + '/' + period + '/' + thumbnail.substring(thumbnail.lastIndexOf('\\') + 1) + '/' + image.substring(image.lastIndexOf('\\') + 1));
        //쿼리 날릴 때 setter는 의미없음(reRendering에 필요할 뿐)
        //setThumbnail(thumbnail.substring(thumbnail.lastIndexOf('\\')+1));
        //setImage(image.substring(image.lastIndexOf('\\')+1))

        const eventDTO = { title: title, start_at: start_at, thumbnail: thumbnail };//object type

        try {

            // async function & await fetch : 'synchronous' request-response pair
            const response = await fetch('http://localhost:9090/eeeeeeeee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventDTO)
            });

            if(response.ok) {
                alert('이벤트를 정상적으로 등록했습니다.');
                dismissHandler();
            }

        }catch(error) {
            alert('서버와 통신이 원활하지 않습니다.');
            console.log(error);
        }

    }

    return (
        <>
            <Modal className='comp--event--inserter--container comp--event--manager--modal'
                {...props}
                size="lg"
                centered
                backdrop="static"   // will not close when clicking outside of the modal
                onHide={dismissHandler}
            >
                <Modal.Header closeButton>
                    {/* closeButton 클릭 => onHide={dismissHandler} 실행 */}
                    <Modal.Title id="title_modal">
                        이벤트 등록
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
                                onClearButtonClick={() => setPeriod([start_at, end_at])}
                                hidden={!periodPicker ? true : false}
                            />
                        </div>
                        <Form.Group className="mb-3" controlId="input_thumbnail">
                            <Form.Label>이벤트 섬네일</Form.Label>
                            <Form.Control
                                type='file'
                                size='sm'
                                onChange={(e) => setThumbnail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input_image">
                            <Form.Label>이벤트 이미지</Form.Label>
                            <Form.Control
                                type='file'
                                size='sm'
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button hidden onClick={dismissHandler}>Close</Button> */}
                    <Button onClick={insertHandler} variant="outline-success" >등록하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
