import React from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import { useParams } from 'react-router-dom';

export default function PageEventDetail() {

    const {no} = useParams();



    return (
        <>
            <div className='page--event--detail--container'>

                <BackNav title="네이버페이 할인 이벤트"/>
                <div id="container_event_detail">
                <h1>PageEventDetail</h1>
                    <p>{no}</p>
                </div>
            </div>

        </>
    )
}
