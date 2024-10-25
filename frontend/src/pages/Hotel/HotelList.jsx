import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container';

import { useInView } from 'react-intersection-observer'; // 무한 스크롤
import 'bootstrap/dist/css/bootstrap.css'
import HotelFilter from '../../componets/Hotel/HotelFilter';
import HotelModal from '../../componets/Hotel/HotelModal';
import HotelGrid from '../../componets/Hotel/HotelGrid';
import CompHeaderGeneral from '../../componets/Header/CompHeaderGeneral';
import CompSearchBox from '../../componets/Search/CompSearchBox';



export default function HotelList(props) {


  ////////////////////////////////////////JIP1017
  const place = '제주도';
  const today = new Date(); //오늘 날짜
  const check_in = new Date(today.setDate(today.getDate()+1));
  const check_out = new Date(today.setDate(today.getDate()+2));
  const member = 2;
  ////////////////////////////////////////JIP1017

  // searchBox(Modal)이 열렸니?
  const [searchBoxShow, setSearchBoxShow] = useState(false);

  // 어디서 모달 불렀니?
  const functionFromWhere = (fromWhere) => {
    console.log('where are you?: ' + fromWhere);
  }

  // Header에서 어떤 input 눌렀니?
  const [focus, setFocus] = useState('input_place');

  const functionSearchPicker = (fromMyChild) => {
    console.log(fromMyChild + ' is picked at headerGeneral');
    //선택 위치에 따라 focus 변경 -> 하위 모달에 focus 전달
    setFocus(fromMyChild);
    setSearchBoxShow(true);
  }
  ////////////////////////////////////////JIP1017



  // const [hotels, setHotels] = useState([]);

  // useEffect(() => {
  //   fetch('매핑주소')
  //     .then(response => response.json())
  //     .then(data => setHotels(data))
  //     .then(data => setRooms(data))
  //     .then(data => setReviews(data))
  //     .catch(error => console.error('Error fetching hotel data:', error));
  // }, []);



  // 무한 스크롤
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);

  const hotel = [
    {
      hotelNo: 1,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 0,
      roomDcprice: 300000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 2,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 3,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 0,
      roomDcprice: 300000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 4,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 5,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 6,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 7,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 8,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 9,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 0,
      roomDcprice: 300000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 10,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 11,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 12,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 13,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 14,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
    {
      hotelNo: 15,
      hotelRating: '블랙·5성급·호텔',
      hotelName: '제주신라호텔',
      hotelAdress: '서귀포시',
      ReviewRating: 9.6,
      totalReviewCount: 901,
      roomPrice: 300000,
      roomDiscount: 10,
      roomDcprice: 270000,
      hotelThumbnail: '/HotelList/호텔1.jpg'
    },
  ];

  // // 더미 데이터 생성 함수
  // const generateHotels = (page) => {
  //   const newHotels = Array(10).fill().map((_, index) => ({
  //     hotelNo: (page - 1) * 10 + index + 1,
  //     hotelRating: '블랙·5성급·호텔',
  //     hotelName: '제주신라호텔',
  //     hotelAdress: '서귀포시',
  //     ReviewRating: 9.6,
  //     totalReviewCount: 901,
  //     roomPrice: 300000,
  //     roomDiscount: 10,
  //     roomDcprice: 270000,
  //     hotelThumbnail: '/HotelList/호텔1.jpg'
  //   }));
  //   return newHotels;
  // };

  // // 호텔 데이터를 로드하는 함수
  // const loadMoreHotels = () => {
  //   const newHotels = generateHotels(page);
  //   setHotels((prevHotels) => [...prevHotels, ...newHotels]);
  //   setPage((prevPage) => prevPage + 1);
  // };

  // useEffect로 뷰포트에 들어갈 때마다 더 많은 호텔을 로드
  useEffect(() => {
    if (inView) {
      
    }
  }, [inView]);


  // 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // 필터 클릭 시
  const handleShow = () => setShow(true);



  return (
    <Container className='hotel--list'>

      {/* header w/ searchParams JIP1017 */}
      <CompHeaderGeneral
        where={functionFromWhere}
        callParent={functionSearchPicker}
        place={place}
        check_in={check_in}
        check_out={check_out}
        member={member}
      />

      {/* searchBox(Modal) JIP1017 */}
      <CompSearchBox
        show={searchBoxShow}
        onHide={() => { setSearchBoxShow(false) }}
        place={place}
        check_in={check_in}
        check_out={check_out}
        member={member}
        focus={focus}
      />

      <HotelFilter handleShow={handleShow} />

      <HotelModal props={props} show={show} handleClose={handleClose} />

      <HotelGrid hotels={hotel} />
      {/* 뷰포트 안에 들어오면 더 많은 데이터를 로드 */}
      <div ref={ref} style={{ height: '1px' }} />
    </Container>
  )
}