import React, { useEffect, useState } from 'react'
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
import axios from 'axios';

export default function RoomList() {

    const [RoomInfos, setRoomInfos] = useState([]);  // 객실 정보를 저장할 state
    const [error, setError] = useState(null);        // 에러 핸들링을 위한 state
    const [loading, setLoading] = useState(true);    // 로딩 상태 관리

    // 기본 파라미터
    const hotelNo = 1;
    const checkInDate = "2024-10-20T15:00:00";
    const checkOutDate = "2024-10-22T11:00:00";
    const peopleMax = 3;

    // 룸리스트 가져오기
    const fetchHotelRoomList = async () => {
        try {
          const response = await axios.get('http://localhost:9090/HotelRoomList', {
            params: { hotelNo, checkInDate, checkOutDate, peopleMax },
          });
          setRoomInfos(response.data);  // 성공 시 응답 데이터를 RoomInfos에 저장
        } catch (error) {
          setError(error);  // 오류가 발생한 경우 에러 저장
        } finally {
          setLoading(false);  // 로딩 상태 종료
        }
      };

    useEffect(() => {
        fetchHotelRoomList();  // 함수 호출
      }, []);  // 컴포넌트가 처음 렌더링될 때 한 번 실행

  
    const HotelInfo = {
        hotelNo: 1,
        hotelRating: "블랙·5성급·호텔",
        hotelName : "제주신라호텔",
        reviewAvg : 4.8,
        totalReviewCount : 518,
        hotelAdress: "제주특별자치도 서귀포시 색달동 3039-3",
        hotelIntroduction: "세계 자연문화유산인 제주의 아름다운 풍광을 담은 리조트로써 그 명성을 쌓아가고 있는 제주신라호텔은 1980년 개관부터 지금까지 품격과 문화가 있는 휴식지로서 수많은 굵직한 국제행사를 성공적으로 치러온 최고의 리조트입니다 이국적인 분위기와 최고의 시설을 선보이며 고객에게 먼저 다가가는 리조트에 특화된 서비스로 호텔에 다녀간 세계의 국가수반을 비롯 많은 VIP들에게 크나큰 찬사를 받아 왔습니다",
        hotelAmenities: ['피트니스', '수영장', '미니바', '사우나', '무선인터넷', '욕실용품', '레스토랑', '금연', 'TV', '에어컨', '프린터사용', '라운지', '짐보관가능', '샤워실', '욕조', '무료주차', '카페', '공용스파', '다리미', '카드결제', '주차장', '엘리베이터'],
        hotelThumbnail: ['/HotelList/호텔1.jpg'],
        checkInDay: "10월 13일",
        checkOutDay: "10월 14일",
        period: 1,
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

    const rooms = [
        {
            roomNo: 1,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 0,
            roomDcprice: 786500,
            availableRooms: 3,
        },
        {
            roomNo: 2,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 0,
            roomDcprice: 786500,
            availableRooms: 0,
        },
        {
            roomNo: 3,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 3,
        },
        {
            roomNo: 4,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 0,
            roomDcprice: 786500,
            availableRooms: 3,
        },
        {
            roomNo: 5,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 0,
        },
        {
            roomNo: 6,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 0,
            roomDcprice: 786500,
            availableRooms: 3,
        },
        {
            roomNo: 7,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 0,
        },
        {
            roomNo: 8,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 3,
        },
        {
            roomNo: 9,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 3,
        },
        {
            roomNo: 10,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 3,
        },
        {
            roomNo: 11,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 0,
        },
        {
            roomNo: 12,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 3,
        },
        {
            roomNo: 13,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 3,
        },
        {
            roomNo: 14,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 0,
        },
        {
            roomNo: 15,
            roomName: '산 전망 스탠다드 더블 룸',
            roomThumbnail: '/HotelList/룸1.jpg',
            roomPeopleInfo: '기준2인 · 최대3인 (유료)',
            roomPeopleMax: 3,
            roomCheckinTime: '15:00',
            roomCheckoutTime: '11:00',
            roomPrice: 786500,
            roomDiscount: 49,
            roomDcprice: 399300,
            availableRooms: 3,
        },
        
    ];
    
    
    const [showAll, setshowAll] = useState(false);

    const displayedRooms = showAll ? RoomInfos : RoomInfos.slice(0, 10);



    const handleFindButtonClick = () => {
        const encodedLocation = encodeURIComponent(HotelInfo.hotelAdress); // 주소를 URL 인코딩
        window.location.href = `/HotelMap?location=${encodedLocation}`;
    };
    
    return (
        <Container className='room--list'>
            
            {/* {RoomInfos?.hotelImg.length > 0 && <HotelCarousel images={RoomInfos.hotelImg}/>} */}
            <HotelCarousel images={HotelInfo.hotelThumbnail}/>

            <div className='HotelInfo'>
                <div className='HotelRN'>
                    <div className='HotelRank'>{HotelInfo.hotelRating}</div>
                    <div className='HotelName'>{HotelInfo.hotelName}</div>
                </div>

                <IoIosHeartEmpty className='HeartIcon'/>
            </div>

            <div className='RowLine'></div>

            <HotelReview Reviews={Reviews} HotelInfo={HotelInfo} />


            <div className='HotelLocation'>
                <div className='LoTitle'>위치/길찾기</div>
                <span className='LoContent'>{HotelInfo.hotelAdress}</span>
                <Button id='FindBtn' onClick={handleFindButtonClick}>길찾기<IoNavigate /></Button> 
                
                <KakaoMap Location={HotelInfo.hotelAdress} />
            </div>

            <div className='RLtitle'>객실선택</div>

            {displayedRooms.map(rooms => (
                <RoomGrid rooms={rooms}/>
            ))}

            {RoomInfos.length > 10 && !showAll && (
                <div onClick={() => setshowAll(true)} className='showAll'>객실 모두보기</div>
            )}

            <div className='RowLine'></div>

            <div className='IntroTitle'>숙소 소개</div>
            <HotelIntroduce introduce={HotelInfo.hotelIntroduction}/>

            <div className='RowLine'></div>

            <div className='ServiceTitle'>서비스 및 부대시설</div>
            <HotelService services={HotelInfo.hotelAmenities}/>
            

            
            
            <Footer />
        </Container>

        
    )
}