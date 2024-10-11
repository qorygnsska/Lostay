import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventCarousel from '../../componets/Carousel/EventCarousel';
import CardCarousel from '../../componets/Carousel/CardCarousel';

export default function Home() {

    const [images, setImages] = useState(['66fac140e8c113.870765961_1.png'
        , '66fac140e8c113.870765961_2.png'
        , '66fac140e8c113.870765961_3.png'
        , '66fac140e8c113.870765961_4.png'
        , '66fac140e8c113.870765961_5.png'
        , '66fac140e8c113.870765961_6.png']); // 이미지 상태 초기화

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
            <CardCarousel images={images} />

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
