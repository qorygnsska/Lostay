import React from 'react'
import { Container } from 'react-bootstrap'

import { GrNext } from "react-icons/gr";

import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import HotelCarousel from '../../componets/Hotel/HotelCarousel';

export default function RoomList() {
    
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
    
    return (
        <Container className='room--list'>
            
            <HotelCarousel />

            <div className='HotelInfo'>
                <div className='HotelRN'>
                    <div className='HotelRank'>블랙·5성급·호텔</div>
                    <div className='HotelName'>제주신라호텔</div>
                </div>

                <IoIosHeartEmpty className='HeartIcon'/>
            </div>

            <div className='RowLine'></div>

            <div className='ReviewBox'>
                <div className='StarDiv'>
                  <div className='Star'>
                    <FaStar className='StarIcon' />
                    <div className='StarNum'>9.6</div>
                  </div>
                  <span className='StarCount'>904명 평가</span>
                  <GrNext />
                </div>

                <div className='ReviewWrap'>
                    {Reviews.map((review) => (
                        <div className='ContentBox'>
                            <div className='ReviewSD'>
                                <div className='ReviewStar'>
                                    <FaStar className='ReviewIcon'/>
                                    <span>{review.rank}</span>
                                </div>

                                <div className='ReviewDate'>
                                    {review.date}
                                </div>
                            </div>

                            <div className='ReviewContent'>
                                {review.content}
                            </div>

                        </div>
                    ))}
                </div>
            </div>


            <div className='HotelLocation'>
                <div className='LoTitle'>위치/길찾기</div>
            </div>

        </Container>
    )
}