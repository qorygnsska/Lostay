import React, { useEffect, useState } from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import CompEventUnit from '../../componets/Event/CompEventUnit'
import Navbar from "../../componets/Navbar/Navbar";
import NavTop from "../../componets/NavToTop/NavTop";
import { Link } from 'react-router-dom';


export default function PageEventList() {

    //db에서 받아올 eventList(array)
    const [eventList, setEventList] = useState([]); //초기값은 []: empty array
    //Server에 db 데이터 요청
    const getEventList = () => {
        fetch('http://localhost:9090/evnetList')    // fetch() : (default) 'GET' request, 'async'
            .then(response => response.json())  // response가 오면 json 변환
            .then(data => {
                console.log(data);
                //결과물로 setEventList 
                setEventList(data);
            })
            .catch(error => {
                alert('이벤트 페이지를 불러올 수 없습니다.');
                console.log(error);
            })
    }

    //1st args getEventList() : getEventList 메서드에 effect 사용
    //2nd args [] : 처음 마운트될 때만 실행,,,,
    useEffect(() => {
        getEventList();
    }, []);


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
