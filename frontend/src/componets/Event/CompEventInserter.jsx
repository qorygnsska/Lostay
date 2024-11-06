import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Calendar } from 'primereact/calendar';
import { adminPrivateApi } from '../../api/adminApi';

export default function CompEventInserter(props) {

    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)
    const today = new Date(); //오늘 날짜
    today.setHours(0, 0, 0, 0); //오늘 날짜의 시간, 분, 초, ms를 모두 0으로 설정

    const tomorrow = new Date(today); //오늘 + 1
    tomorrow.setDate(today.getDate() + 1);

    const tdat = new Date(tomorrow); //오늘 + 1 + 1
    tdat.setDate(tomorrow.getDate() + 1)

    // Date() -> "yyyy/MM/dd" (날짜 형식 -> 텍스트 형식 변환 함수)
    const dateFormatter = (rawDate) => (rawDate.getFullYear().toString() + "/" + (rawDate.getMonth() + 1).toString() + "/" + rawDate.getDate().toString());

    const periodFormatter = (period_selected) => {
        if (period_selected === null || period_selected === '') {
            return null;
        } else if (period_selected[1] === null) {
            return dateFormatter(period[0]);
        } else {
            return dateFormatter(period[0]) + ' - ' + dateFormatter(period[1]);
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)

    const [title, setTitle] = useState('');
    const [period, setPeriod] = useState([tomorrow, tdat]);
    //default period: [tomorrow, tdat]
    //minDate: tomorrow (내일 0시부터 시작되는 이벤트)
    const [thumbnail, setThumbnail] = useState('');
    const [image, setImage] = useState('');

    //////////////////////////////////////////////////////////for hidden
    const [periodPicker, setPeriodPicker] = useState(false);

    //'닫기' 버튼 클릭 시(onHide), 모든 값 초기화하고 모달 숨김
    const dismissHandler = () => {
        setTitle('');
        setPeriod([tomorrow, tdat]);
        setThumbnail('');
        setImage('');
        setPeriodPicker(false);
        props.onHide();
    }
    //////////////////////////////////////////////////////////for hidden

    //이벤트 등록 실행
    const insertHandler = async () => { // *****async function

        console.log(title + '/' + period + '/' + thumbnail + '/' + image);

        if (title === '') {
            alert('이벤트 제목을 입력하세요.');
        } else if (thumbnail === '') {
            alert('섬네일을 등록하세요.');
        } else if (image === '') {
            alert('이미지를 등록하세요.');
        } else {

            ////////////////////////////////////////////////toISOString 시차 적응
            //front의 js Date: 한국 표준시
            //toISOString(): UTC기준
            //시차 9시간
            const eventCreateAt = new Date(period[0]);
            eventCreateAt.setHours(eventCreateAt.getHours() + 9);

            let eventEndAt;
            if (period[1] == null) {   //종료날짜를 선택하지 않은 경우
                eventEndAt = new Date(period[0]);
            } else {
                eventEndAt = new Date(period[1]);
            }
            eventEndAt.setHours(eventEndAt.getHours() + 9 + 23, 59, 59);//마지막 날의 23:59:59
            ////////////////////////////////////////////////toISOString 시차 적응

            //file type도 넘겨주려고 From형식으로 담아준다(multipart/form-data)
            const formData = new FormData();
            formData.append('eventTitle', title);
            formData.append('eventCreateAt', eventCreateAt.toISOString());
            formData.append('eventEndAt', eventEndAt.toISOString());
            formData.append('thumbnail', thumbnail);
            formData.append('image', image);

            try {
                // async function & await fetch : 'synchronous' request-response pair
                // const response = await fetch('http://localhost:9090/admin/event', {
                //     method: 'POST',
                //     headers: {},
                //     body: formData
                //     //헤더타입을 빈 객체로 정의하는 이유 
                //     // 헤더를 'Content-Type': 'multipart/form-data'로 명시해주면 boundary가 자동으로 붙어서 컨트롤러에서 받을 떄 boundary를 맞춰줘야 함
                //     // 헤더를 명시하지 않으면 실제로는 'Content-Type': 'multipart/form-data'으로 만들어지지만 boundary는 붙지 않음
                //     // 헤더타입이 json이 아니기 때문에 ('Content-Type': 'application/json')
                //     // body도 json으로 변환하지 않음 (JSON.stringfy(object))
                // });
                //
                // axios 안 쓸 때

                const response = await adminPrivateApi.post('/admin/event', formData, {headers: {}});
                if (response.ok) {
                    alert('이벤트를 정상적으로 등록했습니다.');
                    window.location.href = "/admin-event"; //refreshing window
                } else {
                    console.log(response);
                    alert('서버와 통신이 원활하지 않습니다.');
                }

            } catch (error) {
                console.log(error);
                alert('서버와 통신이 원활하지 않습니다.');
            }
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
                            <Calendar className="calendar mb-3"
                                inline
                                showButtonBar
                                selectionMode="range"
                                value={period}
                                minDate={tomorrow}
                                onChange={(e) => setPeriod(e.value)}
                                onClearButtonClick={() => setPeriod([tomorrow, tdat])}
                                hidden={!periodPicker ? true : false}
                            />
                        </div>
                        <Form.Group className="mb-3" controlId="input_thumbnail">
                            <Form.Label>이벤트 섬네일</Form.Label>
                            <Form.Control
                                type='file'
                                size='sm'
                                accept="image/*"// 모든 이미지 파일
                                onChange={(e) => setThumbnail(e.target.files[0])}//파일 하나만
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="input_image">
                            <Form.Label>이벤트 이미지</Form.Label>
                            <Form.Control
                                type='file'
                                size='sm'
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}//파일 하나만
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