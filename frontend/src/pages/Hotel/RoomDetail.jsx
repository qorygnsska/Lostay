import React from 'react'
import { Button, Container } from 'react-bootstrap'

import HotelCarousel from '../../componets/Hotel/HotelCarousel';

import { GrNext } from "react-icons/gr";
import { Link } from 'react-router-dom';
import Footer from '../../componets/Footer/Footer';

import { IoCheckmark } from "react-icons/io5";
import HotelReview from '../../componets/Hotel/HotelReview';

import { IoNavigate } from "react-icons/io5";
import KakaoMap from '../../componets/Map/KakaoMap';
import RoomNav from '../../componets/RoomNav/RoomNav';


export default function RoomDetail() {

    const RoomInfo = {
        id: 1,
        name:'산 전망 스탠다드 트윈 룸',
        hotelname: '제주신라호텔',
        p1: 2,
        p2: 3,
        checkIn: '15:00',
        checkOut: '11:00',
        realPrice: 786500,
        discount: 49,
        discountPrice: 399300,
        info: ['2인 기준 최대 3인 (유료)', '인원 추가시 비용이 발생되며 현장에서 결제 바랍니다.', '싱글침대 2개', '객실+욕실 / 12.1평'],
        service: ['TV', '냉장고', '전기주전자', '찻잔', '티백', '물컵', '전화기', '금고', '슬리퍼', '욕실용품', '드라이기'],
        images: ['/HotelList/룸1.jpg', '/HotelList/룸2.jpg'],
        reviewCount: 58,
        starAvg: 4.5,
        location: "제주특별자치도 서귀포시 색달동 3039-3",
        InDate:'10월 9일',
        OutDate:'10월 10일',
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


    const handleFindButtonClick = () => {
        const encodedLocation = encodeURIComponent(RoomInfo.location); // 주소를 URL 인코딩
        window.location.href = `/HotelMap?location=${encodedLocation}`;
    };

    return (

        <Container className='room--detail--container'>

            <HotelCarousel images={RoomInfo.images}/>

            <div className='NameBox'>
                <div className='RoomName'>{RoomInfo.name}</div>
                <Link className='HotelName'>{RoomInfo.hotelname}<GrNext/></Link>
            </div>

            <div className='RowLine'></div>

            <div className='InfoBox'>
                <div className='InfoTitle'>객실 안내</div>
                <div className='CheckInfo'>체크인 {RoomInfo.checkIn} ~ 체크아웃 {RoomInfo.checkOut}</div>
                {RoomInfo.info.map(info => (
                    <div className='InfoContent'>{info}</div>
                ))}

                <div className='SerTitle'>편의시설</div>
                <div className='SerDiv'>
                    {RoomInfo.service.map(service => (
                        <div className='SerContent'><IoCheckmark /> {service}</div>
                    ))}
                </div>

                <div className='CanTitle'>취소 및 환불 규정</div>
                <div className='CancelContent'>입실 전날까지 전액 환불 가능하며, 입실 당일 취소는 불가능합니다.</div>
            </div>


            <div className='ReTitle'>객실 리뷰</div>
            <HotelReview HotelInfo={RoomInfo} Reviews={Reviews}/>


            <div className='LoTitle'>위치/길찾기</div>
            <span className='LoContent'>{RoomInfo.location}</span>
            <Button id='FindBtn' onClick={handleFindButtonClick}>길찾기<IoNavigate /></Button> 
                
            <KakaoMap Location={RoomInfo.location} />

            <RoomNav info={RoomInfo}/>
            <Footer />
        </Container>


    )
}



{/* <div className='abc'>
    <div className='RealPrice'>{RoomInfo.realPrice.toLocaleString()}원</div>
    <div className='RoomDiscount'>
        <div className='Discount'>{RoomInfo.discount}%</div>
        <div className='DiscountPrice'>{RoomInfo.discountPrice.toLocaleString()}원</div>
    </div>
</div> */}