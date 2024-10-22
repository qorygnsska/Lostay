import React, { useEffect, useState } from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import { useParams } from 'react-router-dom';

export default function PageEventDetail() {

    const { no } = useParams();
    //no: event_no로  이벤트 정보 쿼리 요청

    const [event, setEvent] = useState();//초기값 null

    const getEvent = () => {

        fetch(`http://localhost:9090/eventDetail/${no}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEvent(data);
            }).catch(error => {
                alert('이벤트 페이지를 불러올 수 없습니다.');
                console.log(error);

            })

    }


    //1st args getEventList() : getEvent 메서드에 effect 사용
    //2nd args [no] : no가 바뀔 때마다 re-rendering
    useEffect(() => {
        getEvent();
    }, [no]);



    if (!event) {
        return <p>DataNotArrived</p>
    } else {
        return (
            <>
                <div className='page--event--detail--container'>

                    {/* BackNav title에 이벤트 title 넣어주기 */}
                    <BackNav title="네이버페이 할인 이벤트" />

                    <div id="container_event_detail">

                        <h1>PageEventDetail eventNo: {no}</h1>
                        <p>{event.eventTitle}</p>
                        <img src={event.eventImg} alt={event.eventTitle}></img>
                    </div>

                </div>
            </>
        )
    }
}
