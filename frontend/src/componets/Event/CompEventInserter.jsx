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

    const insertHandler = () => {
        console.log(title + '/' + period);

    }

    return (
        <>
            <Modal className='comp--event--inserter--container comp--event--manager--modal'
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

                        <div id="container_period_picker" className="d-flex justify-content-center mb-3">
                            <Calendar 
                                id="calendar"
                                inline
                                showButtonBar
                                selectionMode="range"
                                value={period}
                                onChange={(e) => setPeriod(e.value)}
                                onClearButtonClick={() => setPeriod([start_at, end_at])}
                                hidden={!periodPicker ? true : false}
                            />
                        </div>

                        <Form.Group className="mb-3" controlId="input_file">
                            <Form.Label>이벤트 사진</Form.Label>
                            <Form.Control type='file' size='sm' />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button hidden onClick={props.onHide}>Close</Button>
                    <Button onClick={insertHandler} variant="outline-success" >추가하기</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
