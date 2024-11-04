import React, { useEffect, useState } from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import { useParams } from 'react-router-dom';

export default function PageEventDetail() {

    const [event, setEvent] = useState();//초기값 null
    //{eventNo: "", eventCreateAt: "", eventEndAt: "",  eventImg:  "",  eventThumbnail:  "", eventTitle: ""}

    // no(event_no): url 파라미터에서 가져와서
    const { no } = useParams();

    // function getEvent() {}
    const getEvent = () => {
        //request 'GET'
        fetch(`http://localhost:9090/event/detail/${no}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEvent(data);

            }).catch(error => {
                alert('이벤트 페이지를 불러올 수 없습니다.');
                console.log(error);
                window.location.href = "/event-list"; //refreshing window
            })
    }

    //1st arg getEventList() : getEvent 메서드에 effect 사용
    //2nd arg [no] : no가 바뀔 때마다 re-rendering
    useEffect(() => {
        getEvent();
    }, [no]);

    // event 초기값이 null이라 서버에서 응답이 올때까지 nullPointerException 방지
    if (!event) {
        return <p>ServiceDenied</p>
    } else {
        return (
            <>
                <div className='page--event--detail--container'>

                    {/* BackNav title에 이벤트 title 넣어주기 */}
                    <BackNav title={event.eventTitle} />

                    <div id="container_event_detail">
                        {/* process.env.PUBLIC_URL: public folder 접근 */}
                        {/*상대경로로 쓰면 url에서 localhost:3000/event-detail/ 까지 기본으로 들어감 */}
                        <img src={process.env.PUBLIC_URL + '/' + event.eventImg} alt={event.eventTitle} />
                    </div>

                </div>
            </>
        )
    }
}