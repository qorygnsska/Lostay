import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventCarousel from '../../componets/Carousel/EventCarousel';
import CardCarousel from '../../componets/Carousel/CardCarousel';

export default function Home() {

    const images = ['66fac140e8c113.870765961_1.png'
        , '66fac140e8c113.870765961_2.png'
        , '66fac140e8c113.870765961_3.png'
        , '66fac140e8c113.870765961_4.png'
        , '66fac140e8c113.870765961_5.png'
        , '66fac140e8c113.870765961_6.png']; // 이미지 상태 초기화

    const hotelList = [
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '3등급', hotelName: '구월 호텔반월', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 8 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '롯데 시티호텔 울산', reviewAvg: 4.7, reviewCnt: 3015, oriPrice: 72800, discount: 0 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '3등급', hotelName: '스탠포드 호텔', reviewAvg: 4.6, reviewCnt: 303, oriPrice: 390000, discount: 0 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '3등급', hotelName: '세인트존스 호텔', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 20 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '2등급', hotelName: '호텔 U5', reviewAvg: 4.2, reviewCnt: 150, oriPrice: 108000, discount: 4 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '스카이베이호텔 경포', reviewAvg: 4.1, reviewCnt: 1220, oriPrice: 405000, discount: 5 }
    ]; // 이미지 상태 초기화

    return (
        <div className='home--container'>
            <div className='logo'>
                <h1>로스테이</h1>
            </div>

            <div className='search--btn--wrap'>
                <button className='search--btn'>
                    <IoSearchOutline />
                    <span>여행지나 숙소를 검색해보세요.</span>
                </button>
            </div>


            <EventCarousel images={images} />

            <h2>인기호텔</h2>
            <div>인기호텔 리스트</div>
            <CardCarousel hotelList={hotelList} />

            <h2>국내 인기 여행지</h2>
            <div>국내 인기 여행지 리스트</div>

            <h2>여행지별 숙소</h2>
            <div>
                여행지별 숙소리스트
            </div>

            <h2>What?! 특가야 가자</h2>
            <div>특가 캐러셀</div>

            <div>
                푸터
            </div>

        </div>
    )
}
