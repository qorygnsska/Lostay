import React from 'react'
import { Container } from 'react-bootstrap'
import { FaStar } from "react-icons/fa";

import Footer from '../../componets/Footer/Footer';

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrDown } from "react-icons/gr";

export default function HotelReviews() {

    const hotelInfo = {
        hotelNo: 1,
        hotelName: '제주신라호텔',
        hotelRoom: ["산 전망 디럭스 패밀리 트윈 룸1",
            "산 전망 디럭스 패밀리 트윈 룸2",
            "산 전망 디럭스 패밀리 트윈 룸3",
            "산 전망 디럭스 패밀리 트윈 룸4",
            "산 전망 디럭스 패밀리 트윈 룸5",
        ],
        totalReviewCount: 400,
        ReviewRating: 4.9,
    }

    const reviews = [

        {
            reviewNo: 1,
            reviewRating: 5,
            reviewCreateAt: '2024.10.01',
            userNickname: '사람1',
            roomName: "산 전망 디럭스 패밀리 트윈 룸1",
            reviewContent: '아이와 편안하고 즐겁게 여행할 수 있는 더할 나위 없는 최상의 숙소입니다.',
            reviewImg: ['/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg'],

        },
        {
            reviewNo: 2,
            reviewRating: 5,
            reviewCreateAt: '2024.10.02',
            userNickname: '사람2',
            roomName: "산 전망 디럭스 패밀리 트윈 룸2",
            reviewContent: '아이와 편안하고 즐겁게 여행할 수 있는 더할 나위 없는 최상의 숙소입니다.',
            reviewImg: ['/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg'],

        },
        {
            reviewNo: 3,
            reviewRating: 5,
            reviewCreateAt: '2024.10.03',
            userNickname: '사람3',
            roomName: "산 전망 디럭스 패밀리 트윈 룸3",
            reviewContent: '아이와 편안하고 즐겁게 여행할 수 있는 더할 나위 없는 최상의 숙소입니다.',
            reviewImg: [],

        },
        {
            reviewNo: 4,
            reviewRating: 5,
            reviewCreateAt: '2024.10.04',
            userNickname: '사람4',
            roomName: "산 전망 디럭스 패밀리 트윈 룸4",
            reviewContent: '아이와 편안하고 즐겁게 여행할 수 있는 더할 나위 없는 최상의 숙소입니다.',
            reviewImg: ['/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg'],

        },
        {
            reviewNo: 5,
            reviewRating: 5,
            reviewCreateAt: '2024.10.05',
            userNickname: '사람5',
            roomName: "산 전망 디럭스 패밀리 트윈 룸5",
            reviewContent: '아이와 편안하고 즐겁게 여행할 수 있는 더할 나위 없는 최상의 숙소입니다.',
            reviewImg: ['/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg', '/HotelList/호텔1.jpg'],

        },
        {
            reviewNo: 6,
            reviewRating: 5,
            reviewCreateAt: '2024.10.06',
            userNickname: '사람6',
            roomName: "산 전망 디럭스 패밀리 트윈 룸5",
            reviewContent: '아이와 편안하고 즐겁게 여행할 수 있는 더할 나위 없는 최상의 숙소입니다.',
            reviewImg: [],

        },
    ];

    const allImages = reviews.flatMap(review => review.reviewImg);


    return (

        <Container className='hotel--reviews--container'>
            <div className='starTitle'>숙소 평점</div>
            <div className='starDiv'><FaStar className='star' /> {hotelInfo.ReviewRating}</div>

            <div className='AllDiv'>
                <div className='AllImgTitle'>숙소 리뷰사진</div>
                <div className='AllShow'>전체보기({allImages.length})<GrNext/></div>
            </div>

            <div className='AllImgDiv'>
                <div className='prevBtn'><GrPrevious/></div>
        
                {allImages.map((img) => (
                    <img src={img} alt='리뷰총이미지' className='AllImg' />
                ))}
           
                <div className='nextBtn'><GrNext/></div>
            </div>

            <div className='RowLine'></div>

            <div className='RoomFilter'>
                <div className='RoomFilterName'>객실 전체 ({reviews.length})</div>
                <div><GrDown/></div>
            </div>


            <div className='RoomFilter2'>
                <div><input type='checkbox' className='ImgCheck'/> 사진후기만 보기</div>
                <div className='RoomFilterName2'>추천순 <GrDown/></div>
            </div>

            <div className='RowLine'></div>

            <div className='ReviewGrid'>

                {reviews.map(review => (
                    <>
                    <div className='SDBox'>
                        <div className='StarDiv'><FaStar className='ReviewStar'/>{review.reviewRating}</div>
                        <div className='ReviewDate'>{review.reviewCreateAt}</div>
                    </div>

                    <div className='NRBox'>
                        <div className='RowLine2'></div>
                        <div>
                            <div className='Nickname'>{review.userNickname}</div>
                            <div className='ReviewRoom'>{review.roomName}</div>
                        </div>
                    </div>
                    <div className='ReviewContent'>{review.reviewContent}</div>
                    {review.reviewImg.length === 0 ? (
                        <div></div>
                    ) : (
                        <div className='ReviewImgDiv'>
                            <div className='rprevBtn'><GrPrevious/></div>
                            {review.reviewImg.map((img) => (
                                <img src={img} alt='리뷰총이미지' className='ReviewImg' />
                            ))}
                            <div className='rnextBtn'><GrNext/></div>
                        </div>
                    )}
                    
                    <div className='RowLine'></div>
                    </>
                ))}
                
            </div>

            <Footer />
        </Container>
    )
}