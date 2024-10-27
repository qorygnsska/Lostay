import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Calendar } from 'primereact/calendar';
import { GoDash } from 'react-icons/go';

export default function CompEventUpdater(props) {

    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)
    const today = new Date(); //오늘 날짜
    today.setHours(0, 0, 0, 0); //오늘 날짜의 시간, 분, 초, ms를 모두 0으로 설정

    const tomorrow = new Date(today); //오늘 + 1
    tomorrow.setDate(today.getDate() + 1);

    const tdat = new Date(tomorrow); //오늘 + 1 + 1
    tdat.setDate(tomorrow.getDate() + 1)

    // Date() -> "yyyy/MM/dd" (날짜 형식 -> 텍스트 형식 변환 함수)
    const dateFormatter = (rawDate) => (rawDate.getFullYear().toString() + "/" + (rawDate.getMonth() + 1).toString() + "/" + rawDate.getDate().toString());
    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)

    const [no, setNo] = useState('');
    const [title, setTitle] = useState('');
    const [createAt, setCreateAt] = useState(tomorrow);
    const [endAt, setEndAt] = useState(tdat);
    const [thumbnail, setThumbnail] = useState(''); //file
    const [image, setImage] = useState('');
    const [txt_thumbnail, setTxt_thumbnail] = useState(''); //file name
    const [txt_image, setTxt_image] = useState('');

    //수정한 게 있는지 확인용
    const [origin_title, setOrigin_title] = useState('');
    const [origin_createAt, setOrigin_createAt] = useState('');
    const [origin_endAt, setOrigin_endAt] = useState('');

    //////////////////////////////////////////////////////////for hidden
    const [createAtPicker, setCreateAtPicker] = useState(false);
    const [endAtPicker, setEndAtPicker] = useState(false);

    function caClickHandler() {
        if (createAt < tomorrow) {// 시작일이 오늘을 포함하여 이전 날짜인 경우 
            alert('이미 시작된 이벤트의 시작일을 수정할 수 없습니다.');
        } else {
            setCreateAtPicker(!createAtPicker);
        }
    }

    //'닫기' 버튼 클릭 시(onHide), 모든 값 초기화하고 모달 숨김
    function dismissHandler() {
        setNo('');
        setTitle('');
        setCreateAt(tomorrow);
        setEndAt(tdat);
        setThumbnail('');
        setImage('');
        setTxt_thumbnail('');
        setTxt_image('');
        setCreateAtPicker(false);
        setEndAtPicker(false);
        setOrigin_title('');
        setOrigin_createAt('');
        setOrigin_endAt('');
        props.onHide();
    }
    //////////////////////////////////////////////////////////for hidden

    //모달 열릴 때, 해당 이벤트 정보 불러오기
    function getEventInfo() {
        //console.log(props.picked + 'is opening');

        fetch(`http://localhost:9090/adminEventDetail?eventNo=${props.picked}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setNo(data.eventNo);
                setTitle(data.eventTitle);
                setCreateAt(new Date(data.eventCreateAt));
                setEndAt(new Date(data.eventEndAt));

                const tn = data.eventThumbnail.toString();
                const img = data.eventImg.toString();

                setTxt_thumbnail(tn.substring(tn.lastIndexOf("\\") + 1));
                setTxt_image(img.substring(img.lastIndexOf("\\") + 1));

                //수정한 게 있는지 확인용
                setOrigin_title(data.eventTitle);
                setOrigin_createAt(new Date(data.eventCreateAt));
                setOrigin_endAt(new Date(data.eventEndAt));
            })
            .catch(error => {
                console.log(error);
                alert('이벤트 정보를 불러올 수 없습니다.');
                dismissHandler();//모달 닫기
            })
    }

    //이벤트 수정 실행
    const updateHandler = async () => { // *****async function

        if (title === origin_title && createAt.getTime() === origin_createAt.getTime() && endAt.getTime() === origin_endAt.getTime() && thumbnail === '' && image === '') {
            alert('수정한 값이 없습니다.');
        } else if (thumbnail.name === txt_thumbnail) {
            alert('기존 파일명과 섬네일 파일명이 일치합니다. 파일명을 변경해주세요.');
        } else if (image.name === txt_image) {
            alert('기존 파일명과 이미지 파일명이 일치합니다. 파일명을 변경해주세요.');
        } else if (title === '') {
            alert('이벤트 제목을 입력하세요.');
        } else if (window.confirm('정말 수정하시겠습니까?')) {

            ////////////////////////////////////////////////toISOString 시차 적응
            //front의 js Date: 한국 표준시
            //toISOstring(): UTC기준
            //시차 9시간
            const eventCreateAt = new Date(createAt);
            eventCreateAt.setHours(eventCreateAt.getHours() + 9);

            const eventEndAt = new Date(endAt);
            eventEndAt.setHours(0,0,0,0); 
            // 종료날짜를 변경하지 않았을 경우 이미 23:59:59로 맞춰짐, 또 더하면 날짜가 바뀐다!
            eventEndAt.setHours(eventEndAt.getHours() + 9 + 23, 59, 59);//마지막 날의 23:59:59
            ////////////////////////////////////////////////toISOString 시차 적응

            //file type도 넘겨주려고 From형식으로 담아준다(multipart/form-data)
            const formData = new FormData();
            formData.append('eventNo', no);
            formData.append('eventTitle', title);
            formData.append('eventCreateAt', eventCreateAt.toISOString());
            formData.append('eventEndAt', eventEndAt.toISOString());
            if(thumbnail!==''){
                formData.append('thumbnail', thumbnail);//수정안할꺼면 안넘겨준다
            }
            if(image!=='') {
                formData.append('image', image);
            }

            try {
                // async function & await fetch : 'synchronous' request-response pair
                const response = await fetch('http://localhost:9090/adminEvent', {
                    method: 'PUT',
                    headers: {},
                    body: formData
                    //헤더타입을 빈 객체로 정의하는 이유 
                    // 헤더를 'Content-Type': 'multipart/form-data'로 명시해주면 boundary가 자동으로 붙어서 컨트롤러에서 받을 떄 boundary를 맞춰줘야 함
                    // 헤더를 명시하지 않으면 실제로는 'Content-Type': 'multipart/form-data'으로 만들어지지만 boundary는 붙지 않음
                    // 헤더타입이 json이 아니기 때문에 ('Content-Type': 'application/json')
                    // body도 json으로 변환하지 않음 (JSON.stringfy(object))
                });
                if (response.ok) {
                    alert('이벤트를 정상적으로 수정했습니다.');
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

                        <div id="container_period_input" className="d-flex align-items-center mb-3" >
                            <Form.Group className="period_input mb-3" >
                                <Form.Label>이벤트 시작</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="이벤트 시작"
                                    value={dateFormatter(createAt)}
                                    readOnly
                                    onClick={caClickHandler}
                                />
                            </Form.Group>

                            <div className="mb-3">
                                <p id="mock_label"></p>
                                <GoDash size="18" id="seperator_period" />
                            </div>

                            <Form.Group className="period_input mb-3" >
                                <Form.Label>이벤트 종료</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="이벤트 종료"
                                    value={dateFormatter(endAt)}
                                    readOnly
                                    onClick={() => setEndAtPicker(!endAtPicker)}
                                />
                            </Form.Group>
                        </div>

                        <div id="container_period_calendar">
                            <Calendar id="calendar_create_at" className="calendar mb-3"
                                inline
                                showButtonBar
                                value={createAt}
                                minDate={tomorrow}
                                onChange={(e) => setCreateAt(e.value)}
                                onClearButtonClick={() => setCreateAt(tomorrow)}
                                hidden={!createAtPicker ? true : false}
                            />

                            <Calendar id="calendar_end_at" className="calendar mb-3"
                                inline
                                showButtonBar
                                value={endAt}
                                minDate={today}
                                onChange={(e) => setEndAt(e.value)}
                                onClearButtonClick={() => setEndAt(today)}
                                hidden={!endAtPicker ? true : false}
                            />
                        </div>

                        <div id="container_file">
                            <Form.Group className="mb-3" controlId="input_thumbnail">
                                <Form.Label>이벤트 섬네일:&nbsp;<span className="txt_file">{txt_thumbnail}</span></Form.Label>
                                <Form.Control
                                    type='file'
                                    size='sm'
                                    accept="image/*"
                                    onChange={(e) => setThumbnail(e.target.files[0])}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="input_image">
                                <Form.Label>이벤트 이미지:&nbsp;<span className="txt_file">{txt_image}</span></Form.Label>
                                <Form.Control
                                    type='file'
                                    size='sm'
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </Form.Group>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button hidden onClick={dismissHandler}>Close</Button> */}
                    <Button onClick={updateHandler} variant="outline-danger" >수정하기</Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
