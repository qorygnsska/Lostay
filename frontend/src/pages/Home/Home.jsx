import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from '../../componets/Carousel/Carousel';

export default function Home() {
    return (
        <div>
            <h1>로스테이</h1>

            <button>
                <IoSearchOutline />
                <span>여행지나 숙소를 검새해보세요.</span>
            </button>

            <Carousel />

            <h2>인기호텔</h2>
            <div>인기호텔 리스트</div>

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
