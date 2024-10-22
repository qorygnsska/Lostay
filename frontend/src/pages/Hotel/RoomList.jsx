import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import { IoNavigate } from "react-icons/io5";






import HotelCarousel from '../../componets/Hotel/HotelCarousel';
import HotelReview from '../../componets/Hotel/HotelReview';
import KakaoMap from '../../componets/Map/KakaoMap';

import RoomGrid from '../../componets/Room/RoomGrid';
import Footer from '../../componets/Footer/Footer';
import HotelService from '../../componets/Hotel/HotelService';
import HotelIntroduce from '../../componets/Hotel/HotelIntroduce';

export default function RoomList() {


    const HotelInfo = {
        id: 1,
        rank: "블랙·5성급·호텔",
        name : "제주신라호텔",
        starAvg : 4.8,
        reviewCount : 518,
        location: "제주특별자치도 서귀포시 색달동 3039-3",
        introduce: "세계 자연문화유산인 제주의 아름다운 풍광을 담은 리조트로써 그 명성을 쌓아가고 있는 제주신라호텔은 1980년 개관부터 지금까지 품격과 문화가 있는 휴식지로서 수많은 굵직한 국제행사를 성공적으로 치러온 최고의 리조트입니다 이국적인 분위기와 최고의 시설을 선보이며 고객에게 먼저 다가가는 리조트에 특화된 서비스로 호텔에 다녀간 세계의 국가수반을 비롯 많은 VIP들에게 크나큰 찬사를 받아 왔습니다",
        services: ['피트니스', '수영장', '미니바', '사우나', '무선인터넷', '욕실용품', '레스토랑', '금연', 'TV', '에어컨', '프린터사용', '라운지', '짐보관가능', '샤워실', '욕조', '무료주차', '카페', '공용스파', '다리미', '카드결제', '주차장', '엘리베이터'],
        images: ['/HotelList/호텔1.jpg'],
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
        },
        {
            id: 2,
            name: '바다 전망 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 3,
        },
        {
            id: 3,
            name: '정원 전망 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 3,
        },
        {
            id: 4,
            name: '도시 전망 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 3,
        },
        {
            id: 5,
            name: '호수 전망 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 3,
        },
        {
            id: 6,
            name: '고층 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 3,
        },
        {
            id: 7,
            name: '저층 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 0,
        },
        {
            id: 8,
            name: '풀뷰 스탠다드 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 786500,
            discount: 49,
            discountPrice: 399300,
            roomCount: 3,
        },
        {
            id: 9,
            name: '스위트 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 1200000,
            discount: 30,
            discountPrice: 840000,
            roomCount: 0,
        },
        {
            id: 10,
            name: '패밀리 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 4,
            p2: 4,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 950000,
            discount: 25,
            discountPrice: 712500,
            roomCount: 4,
        },
        {
            id: 11,
            name: '로맨틱 스위트',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 1100000,
            discount: 35,
            discountPrice: 715000,
            roomCount: 1,
        },
        {
            id: 12,
            name: '비즈니스 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 850000,
            discount: 20,
            discountPrice: 680000,
            roomCount: 3,
        },
        {
            id: 13,
            name: '디럭스 더블 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 950000,
            discount: 15,
            discountPrice: 807500,
            roomCount: 0,
        },
        {
            id: 14,
            name: '이코노미 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 600000,
            discount: 10,
            discountPrice: 540000,
            roomCount: 5,
        },
        {
            id: 15,
            name: '프리미엄 룸',
            thumbnail: '/HotelList/룸1.jpg',
            p1: 2,
            p2: 2,
            checkIn: '15:00',
            checkOut: '11:00',
            realPrice: 1300000,
            discount: 20,
            discountPrice: 1040000,
            roomCount: 2,
        }
    ];
    
    
    const [showAll, setshowAll] = useState(false);

    const displayedRooms = showAll ? rooms : rooms.slice(0, 10);



    const handleFindButtonClick = () => {
        const encodedLocation = encodeURIComponent(HotelInfo.location); // 주소를 URL 인코딩
        window.location.href = `/HotelMap?location=${encodedLocation}`;
    };
    
    return (
        <Container className='room--list'>
            
            <HotelCarousel images={HotelInfo.images}/>

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
                <span className='LoContent'>{HotelInfo.location}</span>
                <Button id='FindBtn' onClick={handleFindButtonClick}>길찾기<IoNavigate /></Button> 
                
                <KakaoMap Location={HotelInfo.location} />
            </div>

            <div className='RLtitle'>객실선택</div>

            {displayedRooms.map(rooms => (
                <RoomGrid rooms={rooms}/>
            ))}

            {rooms.length > 10 && !showAll && (
                <div onClick={() => setshowAll(true)} className='showAll'>객실 모두보기</div>
            )}

            <div className='RowLine'></div>

            <div className='IntroTitle'>숙소 소개</div>
            <HotelIntroduce introduce={HotelInfo.introduce}/>

            <div className='RowLine'></div>

            <div className='ServiceTitle'>서비스 및 부대시설</div>
            <HotelService services={HotelInfo.services}/>
            

            
            
            <Footer />
        </Container>

        
    )
}