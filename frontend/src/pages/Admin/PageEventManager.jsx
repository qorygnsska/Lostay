import React, { useEffect, useState } from 'react'
import CompEventInserter from '../../componets/Event/CompEventInserter'
import CompEventUpdater from '../../componets/Event/CompEventUpdater'
import CompHeaderAdmin from '../../componets/Header/CompHeaderAdmin'
import { Button, Container, Form, Pagination, Table } from 'react-bootstrap'
import CompAdminBtn from '../../componets/Admin/CompAdminBtn'
import CompAdminSearch from '../../componets/Admin/CompAdminSearch'
import { adminPrivateApi } from '../../api/adminApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function PageEventManager() {
    /////////////////////////////////////////////////////////////////LoginState
    const navigate = useNavigate();
    const adminState = useSelector((state) => state.user.userState);
    const adminAT = useSelector((state) => state.user.userAt)

    useEffect(() => {

        if (adminState === false) {
            alert('접근이 불가능합니다.');
            navigate("/admin-login");
        } else {
            console.log(adminAT);
        }
    }, []);
    /////////////////////////////////////////////////////////////////LoginState


    //default: 전체 보기 vs 진행 중인 이벤트만 보기
    const [viewOngoing, setViewOngoing] = useState(false);

    function filterHandler() {
        setViewOngoing(!viewOngoing);
        setActivePage(1);//필터가 켜질 때 1page 요청
    }

    //하위요소(검색창)가 넘겨줄 값을 담을 변수
    const [text_fromChild, setText_fromChild] = useState('');

    //하위요소(검색창)가 값을 넘겨주면 실행할 함수
    const functionForMyChild = (fromMyChild) => {
        //fromMyChild: 하위요소가 넘겨준 변수(text_search)의 매개변수
        //console.log('text_fromChild: ' + text_fromChild);   //previousState
        //console.log('fromChild: ' + fromMyChild);
        setText_fromChild(fromMyChild);
        setActivePage(1);//검색어가 바뀔 때 1page 요청
    }

    //////////////////////////////////////////////////////////for hidden
    // EventInserter(Modal) 열렸닝?
    const [inserterShow, setInserterShow] = useState(false);
    // EventUpdater(Modal) 열렸닝?
    const [updaterShow, setUpdaterShow] = useState(false);
    //몇번 이벤트 수정 모달 열었니?
    const [pickedEvent, setPickedEvent] = useState();

    const openEventUpdater = (eventNo) => {   // '수정' 버튼에 상속해줄 함수
        setUpdaterShow(true);
        setPickedEvent(eventNo);
    }
    //////////////////////////////////////////////////////////for hidden

    // Date type -> String type(두자리수 맞춤)
    const dateFormatter = (rawDate) => (rawDate.getFullYear().toString() + "/" + (rawDate.getMonth() + 1).toString().padStart(2, '0') + "/" + rawDate.getDate().toString().padStart(2, '0'));

    /////////////////////////////////////////////////////////////////////////////// pagination에 필요한 값들
    const [pageCount, setPageCount] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const pageComp = [];  //pageCount(totalPage) 개수만큼 페이지 버튼 컴포넌트를 담을 배열 초기화
    for (let page = 1; page <= pageCount; page++) {
        pageComp.push(
            <Pagination.Item key={page} active={page === activePage} onClick={() => setActivePage(page)}>{page}</Pagination.Item>
        )
    }
    /////////////////////////////////////////////////////////////////////////////// pagination에 필요한 값들

    // db에서 받아올 eventList(array)
    const [eventList, setEventList] = useState([]); //초기값은 []: empty array

    //Server에 eventList 요청
    const getEventList = (onGoing, eventTitle, requestedPage) => {
        console.log(`getEvent ViewOnGoing: ${viewOngoing} eventTitle: ${eventTitle} page: ${requestedPage}`);

        // fetch() : (default) request 'GET', 'async' // async&await이나 then()은 같은 것
        //fetch(`http://localhost:9090/admin/eventList?onGoing=${onGoing}&eventTitle=${eventTitle}&page=${requestedPage}`) //axios안쓸 때
        adminPrivateApi.get(`/admin/eventList?onGoing=${onGoing}&eventTitle=${eventTitle}&page=${requestedPage}`)
            //.then(response => response.json())  // response가 오면 json 변환 //axios 안쓸 때만 사용(axios는 자동 json변환해 줌)
            .then(response => {
                setEventList(response.data.content); // Page<DTO>.getContent()
                setPageCount(response.data.totalPages);  // Page<DTO>.getTotalPages()
            })
            // .then(data => { //axios안쓸 때
            //     //console.log(data);
            //     setEventList(data.content); // Page<DTO>.getContent()
            //     setPageCount(data.totalPages);  // Page<DTO>.getTotalPages()
            // })
            .catch(error => {
                console.log(error);
                alert('이벤트 정보를 불러올 수 없습니다.');
                window.location.href = "/admin-home";
            })
    }

    //1st arg getEventList() : getEventList 메서드에 effect 사용
    //2nd arg [] : 빈 배열이면 처음 마운트될 때만 실행,,, 배열에 담긴 변수가 변할 때마다 실행하려 re-rendering
    useEffect(() => {
        getEventList(viewOngoing, text_fromChild, activePage);
    }, [viewOngoing, text_fromChild, activePage]);


    return (
        <>
            <div className='page--event--manager--container page--admin'>
                <CompHeaderAdmin />

                <Container id='container_section'>

                    <div className="d-flex justify-content-between mb-3">
                        <Button id="btn_enroll" onClick={() => setInserterShow(true)} variant="outline-success" size="sm" >이벤트 등록</Button>
                        <div className="d-flex">
                            <Form.Switch id="switch_viewer" label="'진행 중' 보기" onClick={filterHandler} />
                            <CompAdminSearch where={'admin-event'} callParent={functionForMyChild} />
                        </div>
                    </div>

                    <Table bordered hover id="table_entire_event">
                        {/* striped  */}
                        <thead id="table_header">
                            <tr>
                                <th className="event_no">No</th>
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
                                //Date type 객체 생성
                                const eachC = new Date(event.eventCreateAt);
                                const eachE = new Date(event.eventEndAt);

                                return (
                                    <tr key={index}>
                                        <td className="event_no">{event.eventNo}</td>
                                        <td className="event_title">{event.eventTitle}</td>
                                        <td className="event_period">{dateFormatter(eachC)} ~ {dateFormatter(eachE)}</td>
                                        <td className="btn_container">
                                            {/*수정 또는 삭제 버튼에 어디서 뭘 누르는지 알려주기 */}
                                            <CompAdminBtn whoAreYou={'update_event'} no={event.eventNo} callParent={openEventUpdater} >수정</CompAdminBtn>
                                            <span>/</span>
                                            <CompAdminBtn whoAreYou={'delete_event'} no={event.eventNo} >삭제</CompAdminBtn>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    <div id="container_paging" className="d-flex justify-content-center">
                        <Pagination hidden={pageComp.length === 0 ? true : false}>
                            <Pagination.First onClick={() => setActivePage(1)} />
                            <Pagination.Prev onClick={() => setActivePage(activePage - 1 < 1 ? 1 : activePage - 1)} />
                            {pageComp}
                            <Pagination.Next onClick={() => setActivePage(activePage + 1 > pageCount ? pageCount : activePage + 1)} />
                            <Pagination.Last onClick={() => setActivePage(pageCount)} />
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
