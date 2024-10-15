import React, { useState } from 'react'
import CompEventInserter from '../../componets/Event/CompEventInserter'
import CompEventUpdater from '../../componets/Event/CompEventUpdater'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Button, Container, Table } from 'react-bootstrap'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'



export default function PageEventManager() {


    //하위요소(검색창)가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');

    //하위요소(검색창)가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        console.log('fromChild: ' + fromMyChild);
        setText_fromChild(fromMyChild);
    }


    //EventInserter(Modal) 열렸닝?
    const [inserterShow, setInserterShow] = useState(false);

    const openEventInserter = () => {
        setInserterShow(true);
    }


    //EventUpdater(Modal) 열렸닝?
    const [updaterShow, setUpdaterShow] = useState(false);


    function openEventUpdater() {   //'수정' 버튼에 상속해줄 함수
        setUpdaterShow(true);
    }

    function deleteEvent() {    //'삭제' 버튼에 상속해줄 함수
        alert('정말 삭제?');
    }



    return (
        <>
            <div className='page--event--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='section_container'>

                    <div className='d-flex justify-content-between mb-3'>
                        <Button id="btn_enroll" onClick={openEventInserter} variant="outline-success" size="sm" >이벤트 등록</Button>
                        <CompAdminSearch where={'admin-event'} callParent={functionForMyChild} />
                    </div>

                    <Table striped bordered hover id='table_entire_event'>
                        <thead id="table_header">
                            <tr>
                                <th>#</th>
                                <th>이벤트 제목</th>
                                <th>이벤트 기간</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            <tr>
                                <td>1</td>
                                <td>이벤트 제목1</td>
                                <td>24.10.14. ~ 24.10.21.</td>
                                <td className='btn_container'>
                                    <CompAdminBtn click={openEventUpdater}>수정</CompAdminBtn>
                                    <CompAdminBtn click={deleteEvent}>삭제</CompAdminBtn>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <CompEventInserter show={inserterShow} onHide={() => setInserterShow(false)} />
                    <CompEventUpdater show={updaterShow} onHide={() => setUpdaterShow(false)} />

                </Container>
            </div>
        </>
    )
}
