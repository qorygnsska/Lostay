import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'

import HotelCarousel from '../../componets/Hotel/HotelCarousel';

import { GrNext } from "react-icons/gr";
import { Link, useLocation, useParams } from 'react-router-dom';
import Footer from '../../componets/Footer/Footer';

import { IoCheckmark } from "react-icons/io5";

import { IoNavigate } from "react-icons/io5";
import KakaoMap from '../../componets/Map/KakaoMap';
import RoomNav from '../../componets/RoomNav/RoomNav';

import BackNav from "../../componets/BackNav/BackNav";
import axios from 'axios';
import RoomReview from '../../componets/Hotel/RoomReview';

import KakaoApiShare from '../../componets/KakaoApi/KakaoApishare';

export default function RoomDetail() {

    const [RoomDetail, setRoomDetail] = useState();  // 객실 정보를 저장할 state
    const [RoomReviews, setRoomReviews] = useState([]);  // 리뷰 정보를 저장할 state
    const [error, setError] = useState(null);        // 에러 핸들링을 위한 state
    const [loading, setLoading] = useState(true);    // 로딩 상태 관리

    
    // 기본 파라미터
    const { roomNo } = useParams();
    const { search } = useLocation();
    const checkInDate = new URLSearchParams(search).get('checkInDate'); // url에서 값 가져오기
    const checkOutDate = new URLSearchParams(search).get('checkOutDate');
    const peopleMax = new URLSearchParams(search).get('peopleMax');

    // 룸디테일 가져오기
    const fetchHotelRoomDetail = async () => {
        try {
          const response = await axios.get('http://localhost:9090/room/RoomDetail', {
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
        const response = await axios.get('http://localhost:9090/review/RoomDetail3', {
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
        window.scrollTo(0, 0);
    }, []);  // 컴포넌트가 처음 렌더링될 때 한 번 실행



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
                <Link to={`/RoomList/${RoomDetail?.hotelNo}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&peopleMax=${peopleMax}`} className='HotelName'>{RoomDetail?.hotelName}<GrNext/></Link>
               
               {/* 카카오 공유 api */}
                <KakaoApiShare
         title={RoomDetail?.roomName}
         address={RoomDetail?.hotelAdress}
        Thumbnail={RoomDetail?.roomThumbnail}
        /> 


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
                <RoomReview HotelInfo={RoomReviews[0]} Reviews={RoomReviews}/>
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
