import React, { useEffect, useState } from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import CompEventUnit from '../../componets/Event/CompEventUnit'
import Navbar from "../../componets/Navbar/Navbar";
import NavTop from "../../componets/NavToTop/NavTop";
import { Link, useNavigate } from 'react-router-dom';


export default function PageEventList() {

    //const navigate = useNavigate();


    //db에서 받아올 eventList(array)
    const [eventList, setEventList] = useState([]); //초기값은 []: empty array

    //Server에 db-event 요청
    const getEventList = () => {
        fetch('http://localhost:9090/eventList')    // fetch() : (default) request 'GET', 'async'
            .then(response => response.json())  // response가 오면 json 변환
            .then(data => {
                console.log(data);
                //결과물로 setEventList 
                setEventList(data);
            })
            .catch(error => {
                alert('이벤트 페이지를 불러올 수 없습니다.');
                console.log(error);
                window.location.href = "/"; //refreshing window
                //navigate('/'); //retaining window
            })
    }

    // fetch('request-url', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(object)})
    // .then(response => {실행할 메서드})
    // .catch(error => {실행할 메서드})
    
    // method(REST): 'POST', 'PUT', 'DELETE', default 'GET'


    //1st args getEventList() : getEventList 메서드에 effect 사용
    //2nd args [] : 처음 마운트될 때만 실행,,,,
    useEffect(() => {
        getEventList();
    }, []); 
    
    //요소를 반환하지 않고 데이터 처리만 하는 경우(return null component)
    //응답받고 navigate로 넘기고, 2nd args에 navigate값을 넣어주기도 함

    return (
        <>
            <div className='page--event--list--container'>

                <BackNav title="이벤트" />

                <div id="container_event_list">

                    {/* 자꾸 인덱스 넣어주라 그러네... event.key */}
                    {/* {eventList.map(event => (
                        <Link className="link_to_event_detail" to={`../event-detail/${event.event_no}`}>
                            <CompEventUnit no={event.event_no} title={event.event_title} thumbnail={event.event_thumbnail} />
                        </Link>
                    ))} */}

                    {eventList.map(function (event, index) {
                        return (
                            <Link key={index} className="link_to_event_detail" to={`../event-detail/${event.eventNo}`}>
                                <CompEventUnit no={event.eventNo} title={event.eventTitle} thumbnail={event.eventThumbnail} />
                            </Link>
                        )
                    })}

                    <NavTop />
                </div>

                {/* 테스트용 임시로 넣은거 */}
                <Navbar />
            </div>
        </>
    )
}
