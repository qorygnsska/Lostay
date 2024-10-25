import React, { useEffect, useState } from 'react'
import CompEventInserter from '../../componets/Event/CompEventInserter'
import CompEventUpdater from '../../componets/Event/CompEventUpdater'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Button, Container, Pagination, Table } from 'react-bootstrap'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import { useLocation, useNavigate } from 'react-router-dom'


export default function PageEventManager() {

    // navigate 쓸까 window.location쓸까
    const navigate = useNavigate();


    //하위요소(검색창)가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');

    //하위요소(검색창)가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        //console.log('fromChild: ' + fromMyChild);

        setText_fromChild(fromMyChild); //검새창에 검색어 유지시키고
        getEventList(fromMyChild, 1);  //이벤트리스트 호출(검색할 때는 setPage=1)
    }


    // EventInserter(Modal) 열렸닝?
    const [inserterShow, setInserterShow] = useState(false);

    function openEventInserter() { // '이벤트 등록' 버튼에 상속해줄 함수
        setInserterShow(true);
    }


    // EventUpdater(Modal) 열렸닝?
    const [updaterShow, setUpdaterShow] = useState(false);
    //몇번 이벤트 수정 모달 열었니?
    const [pickedEvent, setPickedEvent] = useState();


    const openEventUpdater = (eventNo) => {   // '수정' 버튼에 상속해줄 함수
        setUpdaterShow(true);
        setPickedEvent(eventNo);
    }

    const deleteEvent = (eventNo) => {    // '삭제' 버튼에 상속해줄 함수
        if (window.confirm('정말 삭제?')) {
            console.log('삭제 실행' + eventNo);
            //여기서 처리할까 버튼에서 처리할까... 버튼이 나을 듯??

        }
    }




    /////////////////////////////////////////////////////////////////////////////// pagination에 필요한 값들
    const [pageCount, setPageCount] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const pageComp = [];  //pageCount(totalPage) 개수만큼 페이지 버튼 컴포넌트를 담을 배열 초기화
    for (let page = 1; page <= pageCount; page++) {
        pageComp.push(
            <Pagination.Item key={page} active={page === activePage} onClick={() => getEventList(text_fromChild, page)}>{page}</Pagination.Item>
        )
    }
    /////////////////////////////////////////////////////////////////////////////// pagination에 필요한 값들


    // db에서 받아올 eventList(array)
    const [eventList, setEventList] = useState([]); //초기값은 []: empty array

    //Server에 eventList 요청
    const getEventList = (eventTitle, requestedPage) => {
        //console.log('request list of event/ search: ' + eventTitle + '/ page: ' + requestedPage);
        setActivePage(requestedPage);   //요청한 페이지로 page 버튼 activation

        fetch(`http://localhost:9090/adminEventList?eventTitle=${eventTitle}&page=${requestedPage}`)    // fetch() : (default) request 'GET', 'async'
            .then(response => response.json())  // response가 오면 json 변환
            .then(data => {
                console.log(data);

                setEventList(data.content); // Page<DTO>.getContent()
                setPageCount(data.totalPages);  // Page<DTO>.getTotalPages()
            })
            .catch(error => {
                console.log(error);
                alert('이벤트 정보를 불러올 수 없습니다.');
                navigate('/admin-home'); //retaining window
            })
    }


    useEffect(() => {
        getEventList(text_fromChild, activePage);
    }, []);


    return (
        <>
            <div className='page--event--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='section_container'>

                    <div className="d-flex justify-content-between mb-3">
                        <Button id="btn_enroll" onClick={openEventInserter} variant="outline-success" size="sm" >이벤트 등록</Button>
                        <CompAdminSearch where={'admin-event'} callParent={functionForMyChild} />
                    </div>

                    <Table striped bordered hover id="table_entire_event">
                        <thead id="table_header">
                            <tr>
                                <th className="event_no">#</th>
                                <th className="event_title">이벤트 제목</th>
                                <th className="event_period">이벤트 기간</th>
                                <th className="btn_container">관리</th>
                            </tr>
                        </thead>
                        <tbody id="table_body">
                            {/* <tr>
                                    <td>1</td>
                                    <td>이벤트 제목1</td>
                                    <td>24.10.14. ~ 24.10.21.</td>
                                    <td className='btn_container'>
                                        <CompAdminBtn click={openEventUpdater}>수정</CompAdminBtn>
                                        <CompAdminBtn click={deleteEvent}>삭제</CompAdminBtn>
                                    </td>
                                </tr> */}
                            {eventList.map(function (event, index) {
                                return (
                                    <tr key={index}>
                                        <td className="event_no">{event.eventNo}</td>
                                        <td className="event_title">{event.eventTitle}</td>
                                        <td className="event_period">{event.eventCreateAt} ~ {event.eventEndAt}</td>
                                        <td className="btn_container">
                                            {/*수정 또는 삭제 버튼에 어디서 뭘 누르는지 알려주기 */}
                                            <CompAdminBtn whoAreYou={'update_event'} no={event.eventNo} click={openEventUpdater} >수정</CompAdminBtn>
                                            <CompAdminBtn whoAreYou={'delete_event'} no={event.eventNo} click={deleteEvent} >삭제</CompAdminBtn>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.First onClick={() => getEventList(text_fromChild, 1)} />
                            <Pagination.Prev onClick={() => getEventList(text_fromChild, activePage - 1 < 1 ? 1 : activePage - 1)} />
                            {pageComp}
                            <Pagination.Next onClick={() => getEventList(text_fromChild, activePage + 1 > pageCount ? pageCount : activePage + 1)} />
                            <Pagination.Last onClick={() => getEventList(text_fromChild, pageCount)} />
                        </Pagination>
                    </div>

                    {/* 모달 컴포넌트 */}
                    <CompEventInserter show={inserterShow} onHide={() => setInserterShow(false)} />
                    <CompEventUpdater show={updaterShow} picked={pickedEvent} onHide={() => setUpdaterShow(false)} />

                </Container>
            </div>
        </>
    )
}
