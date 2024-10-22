import React, { useState } from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import CompEventUnit from '../../componets/Event/CompEventUnit'
import Navbar from "../../componets/Navbar/Navbar";
import NavTop from "../../componets/NavToTop/NavTop";
import { Link } from 'react-router-dom';


export default function PageEventList() {

    //db에서 받아올 eventList(array)
    const [eventList, setEventList] = useState([
        { event_no: 1, event_title: "테스트1", event_thumbnail: "path1" },
        { event_no: 2, event_title: "테스트2", event_thumbnail: "path1" },
        { event_no: 3, event_title: "테스트3", event_thumbnail: "path1" },
        { event_no: 4, event_title: "테스트4", event_thumbnail: "path1" },
        { event_no: 5, event_title: "테스트5", event_thumbnail: "path1" },
        { event_no: 6, event_title: "테스트6", event_thumbnail: "path1" },
        { event_no: 7, event_title: "테스트7", event_thumbnail: "path1" },
        { event_no: 8, event_title: "테스트8", event_thumbnail: "path1" },
        { event_no: 9, event_title: "테스트9", event_thumbnail: "path1" },
        { event_no: 10, event_title: "테스트10", event_thumbnail: "path1" },
        { event_no: 11, event_title: "테스트111", event_thumbnail: "path1" }
    ]);


    return (
        <>
            <div className='page--event--list--container'>

                <BackNav title="이벤트" />

                <div id="container_event_list">

                    {eventList.map(event => (
                        <Link className="link_to_event_detail" to={`../event-detail/${event.event_no}`}>
                            <CompEventUnit no={event.event_no} title={event.event_title} image={event.event_thumbnail} />
                        </Link>
                    ))}



                    {/* <Link className="link_to_event_detail" to={`../event-detail/${eventList[0].event_no}`}>
                        <CompEventUnit no={eventList[0].event_no} title={eventList[0].event_title} image={eventList[0].event_thumbnail} />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit no="2" title="테스트2" image="path2" />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit no="3" title="테스트3" image="path3" />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit no={eventList[0].no} title={eventList[0].title} image={eventList[0].image} />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                        <CompEventUnit />
                    </Link> */}

                    <NavTop />
                </div>

                {/* 테스트용 임시로 넣은거 */}
                <Navbar />

            </div>
        </>
    )
}
