import React from 'react'
import { Button, Container } from 'react-bootstrap'

import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import { IoNavigate } from "react-icons/io5";

import { IoPersonOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

import HotelCarousel from '../../componets/Hotel/HotelCarousel';
import HotelReview from '../../componets/Hotel/HotelReview';
import KakaoMap from '../../componets/Map/KakaoMap';
import { Link } from 'react-router-dom';
import RoomGrid from '../../componets/Room/RoomGrid';

export default function RoomList() {

    const HotelInfo = {
        id: 1,
        rank: "블랙·5성급·호텔",
        name : "제주신라호텔",
        starAvg : 4.8,
        reviewCount : 518,
        Location: "제주특별자치도 서귀포시 색달동 3039-3",
    };
    
    const Reviews = [
        {
            id: 1,
            rank: 5,
            date: '2024.09.30',
            content: '수영장도 좋고 호텔에서 먹은음식들도 만족스럽고 침구도 깨끗하고 너무 좋았어요 와인패키지 했는데 진짜 많이 만족합니다. 연박했는데 객실청소도 잘되서 마음에 들어요 연박하길잘했어요 !'
        },

        {
            id: 2,
            rank: 4,
            date: '2024.09.27',
            content: '친절한 접객, 깔끔한 시설. 대한민국 최고의 숙소'
        },

        {
            id: 3,
            rank: 3,
            date: '2024.09.10',
            content: '최고의 숙소!!!!'
        }
    ];

    const rooms = [
        {
            id: 1,
            name: '산 전망 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 3,
        }
    ];
    



    const handleFindButtonClick = () => {
        const encodedLocation = encodeURIComponent(HotelInfo.Location); // 주소를 URL 인코딩
        window.location.href = `/HotelMap?location=${encodedLocation}`;
    };
    
    return (
        <Container className='room--list'>
            
            <HotelCarousel />

            <div className='HotelInfo'>
                <div className='HotelRN'>
                    <div className='HotelRank'>{HotelInfo.rank}</div>
                    <div className='HotelName'>{HotelInfo.name}</div>
                </div>

                <IoIosHeartEmpty className='HeartIcon'/>
            </div>

            <div className='RowLine'></div>

            <HotelReview Reviews={Reviews} HotelInfo={HotelInfo} />


            <div className='HotelLocation'>
                <div className='LoTitle'>위치/길찾기</div>
                <span className='LoContent'>{HotelInfo.Location}</span>
                <Button id='FindBtn' onClick={handleFindButtonClick}>길찾기<IoNavigate /></Button> 
                
                <KakaoMap Location={HotelInfo.Location} />
            </div>

            <div className='RLtitle'>객실선택</div>

            <RoomGrid rooms={rooms}/>

        </Container>
    )
}