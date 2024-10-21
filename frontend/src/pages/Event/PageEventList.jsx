import React from 'react'
import BackNav from "../../componets/BackNav/BackNav";
import CompEventUnit from '../../componets/Event/CompEventUnit'
import Navbar from "../../componets/Navbar/Navbar";
import NavTop from "../../componets/NavToTop/NavTop";



export default function PageEventList() {




    return (
        <>
            <div className='page--event--list--container'>
                <BackNav title="이벤트" />
                <div id="container_event_list">
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <CompEventUnit />
                    <NavTop />
                </div>


                
                {/* 테스트용 임시로 넣은거 */}
                <Navbar />
            </div>
        </>
    )
}
