import React, { useState } from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import CompEventUnit from '../../componets/Event/CompEventUnit'
import Navbar from "../../componets/Navbar/Navbar";
import NavTop from "../../componets/NavToTop/NavTop";
import { Link } from 'react-router-dom';


export default function PageEventList() {

    //db에서 받아올 eventList(array)
    const [eventList, setEventList] = useState([{no:4, title:"테스트4", image:"path4"}]);


    return (
        <>
            <div className='page--event--list--container'>

                <BackNav title="이벤트" />

                <div id="container_event_list">
                    <Link className="link_to_event_detail" to="../event-detail">
                    <CompEventUnit no="1" title="테스트1" image="path1"/>
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                    <CompEventUnit no="2" title="테스트2" image="path2"/>
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                    <CompEventUnit no="3" title="테스트3" image="path3"/>
                    </Link>

                    <Link className="link_to_event_detail" to="../event-detail">
                    <CompEventUnit no={eventList[0].no} title={eventList[0].title} image={eventList[0].image}/>
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
                    </Link>

                    <NavTop />
                </div>

                {/* 테스트용 임시로 넣은거 */}
                <Navbar />

            </div>
        </>
    )
}
