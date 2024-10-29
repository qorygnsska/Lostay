import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import HotelCarousel from '../../componets/Hotel/HotelCarousel';

import { GrNext } from "react-icons/gr";
import { Link, useParams } from 'react-router-dom';
import Footer from '../../componets/Footer/Footer';

import { IoCheckmark } from "react-icons/io5";
import HotelReview from '../../componets/Hotel/HotelReview';

import { IoNavigate } from "react-icons/io5";
import KakaoMap from '../../componets/Map/KakaoMap';
import RoomNav from '../../componets/RoomNav/RoomNav';

import BackNav from "../../componets/BackNav/BackNav";
import axios from 'axios';


export default function RoomDetail() {

    const [RoomDetail, setRoomDetail] = useState();  // 객실 정보를 저장할 state
    const [RoomReviews, setRoomReviews] = useState([]);  // 리뷰 정보를 저장할 state
    const [error, setError] = useState(null);        // 에러 핸들링을 위한 state
    const [loading, setLoading] = useState(true);    // 로딩 상태 관리
    
    // 기본 파라미터
    const { roomNo, checkIn, checkOut, member } = useParams();
    const checkInDate = checkIn;
    const checkOutDate = checkOut;
    const peopleMax = member;

    // 룸디테일 가져오기
    const fetchHotelRoomDetail = async () => {
        try {
          const response = await axios.get('http://localhost:9090/RoomDetail', {
            params: { roomNo, checkInDate, checkOutDate, peopleMax },
          });
          setRoomDetail(response.data);  // 성공 시 응답 데이터를 RoomInfos에 저장
        } catch (error) {
          setError(error);  // 오류가 발생한 경우 에러 저장
        } finally {
          setLoading(false);  // 로딩 상태 종료
        }
    };

    // 룸디테일 리뷰3개 가져오기
    const fetchHotelRoomDetailReview3 = async () => {
        try {
        const response = await axios.get('http://localhost:9090/RoomDetail3', {
            params: { roomNo },
        });
        setRoomReviews(response.data);
        } catch (error) {
        setError(error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotelRoomDetail();  // 함수 호출
        fetchHotelRoomDetailReview3();
    }, []);  // 컴포넌트가 처음 렌더링될 때 한 번 실행

    const RoomInfo = {
        roomNo: 1,
        roomName:'산 전망 스탠다드 트윈 룸',
        hotelName: '제주신라호텔',
        roomPeopleInfo: '기준2인 · 최대3인 (유료)',
        roomPeopleMax: 3,
        roomCheckinTime: '15:00',
        roomCheckoutTime: '11:00',
        roomPrice: 786500,
        roomDcprice: 399300,
        roomIntroduction: ['2인 기준 최대 3인 (유료)', '인원 추가시 비용이 발생되며 현장에서 결제 바랍니다.', '싱글침대 2개', '객실+욕실 / 12.1평'],
        roomAmenities: ['TV', '냉장고', '전기주전자', '찻잔', '티백', '물컵', '전화기', '금고', '슬리퍼', '욕실용품', '드라이기'],
        roomImg: ['/HotelList/룸1.jpg', '/HotelList/룸2.jpg'],
        totalReviewCount: 58,
        reviewAvg: 4.5,
        hotelAdress: "제주특별자치도 서귀포시 색달동 3039-3",
        InDate:'10월 9일',
        OutDate:'10월 10일',
    };

    const Reviews = [
        {
            reviewNo: 1,
            reviewRating: 5,
            reviewCreateAt: '2024.09.30',
            reviewContent: '수영장도 좋고 호텔에서 먹은음식들도 만족스럽고 침구도 깨끗하고 너무 좋았어요 와인패키지 했는데 진짜 많이 만족합니다. 연박했는데 객실청소도 잘되서 마음에 들어요 연박하길잘했어요 !'
        },

        {
            reviewNo: 2,
            reviewRating: 4,
            reviewCreateAt: '2024.09.27',
            reviewContent: '친절한 접객, 깔끔한 시설. 대한민국 최고의 숙소'
        },

        {
            reviewNo: 3,
            reviewRating: 3,
            reviewCreateAt: '2024.09.10',
            reviewContent: '최고의 숙소!!!!'
        }
    ];


    const handleFindButtonClick = () => {
        const encodedLocation = encodeURIComponent(RoomDetail.hotelAdress); // 주소를 URL 인코딩
        window.location.href = `/HotelMap?location=${encodedLocation}`;
    };

    return (

        <Container className='room--detail--container'>
            <BackNav title="객실상세" />

            {RoomDetail?.roomImg.length > 0 && <HotelCarousel images={RoomDetail.roomImg}/>}

            <div className='NameBox'>
                <div className='RoomName'>{RoomDetail?.roomName}</div>
                <Link to={`/RoomList/${RoomDetail?.hotelNo}/${checkInDate}/${checkOutDate}/${peopleMax}`} className='HotelName'>{RoomDetail?.hotelName}<GrNext/></Link>
            </div>

            <div className='RowLine'></div>

            <div className='InfoBox'>
                <div className='InfoTitle'>객실 안내</div>
                {RoomDetail?.roomIntroduction.map((info, idx) => (
                    <div className='InfoContent' key={idx}>{info}</div>
                ))}

                <div className='SerTitle'>편의시설</div>
                <div className='SerDiv'>
                    {RoomDetail?.roomAmenities.map((service, idx) => (
                        <div className='SerContent' key={idx}><IoCheckmark /> {service}</div>
                    ))}
                </div>

                <div className='CanTitle'>취소 및 환불 규정</div>
                <div className='CancelContent'>입실 전날까지 전액 환불 가능하며, 입실 당일 취소는 불가능합니다.</div>
            </div>


            <div className='ReTitle'>객실 리뷰</div>
            {RoomReviews.length > 0 ? (
                <HotelReview HotelInfo={RoomReviews[0]} Reviews={RoomReviews}/>
            ) : (
                <div>리뷰가 없습니다.</div>
            )}
            


            <div className='LoTitle'>위치/길찾기</div>
            <span className='LoContent'>{RoomDetail?.hotelAdress}</span>
            <Button id='FindBtn' onClick={handleFindButtonClick}>길찾기<IoNavigate /></Button> 
                
            {RoomDetail?.hotelAdress.length > 0 && <KakaoMap Location={RoomDetail.hotelAdress} />}

            {RoomDetail && <RoomNav info={RoomDetail}/>}
            <Footer />
        </Container>


    )
}
