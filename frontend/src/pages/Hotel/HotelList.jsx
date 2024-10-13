import React, { useEffect, useState } from 'react'
import './HotelList.css';

import Container from 'react-bootstrap/Container';
import { FaStar } from "react-icons/fa6";
import { useInView } from 'react-intersection-observer';

export default function HotelList() {

  // const [hotels, setHotels] = useState([]);

  // useEffect(() => {
  //   fetch('매핑주소')
  //     .then(response => response.json())
  //     .then(data => setHotels(data))
  //     .catch(error => console.error('Error fetching hotel data:', error));
  // }, []);

  // 이런 식으로 데이터를 가져와야함!
  // const hotels = [
  //   {
  //     id: 1,
  //     rank: '블랙·5성급·호텔',
  //     name: '제주신라호텔',
  //     location: '서귀포시',
  //     rating: 9.6,
  //     reviews: 901,
  //     originalPrice: '300,000원',
  //     discountRate: '10%',
  //     discountedPrice: '270,000원',
  //     image: '/HotelList/호텔1.jpg'
  //   },
  //   {
  //     id: 2,
  //     rank: '골드·4성급·호텔',
  //     name: '롯데호텔',
  //     location: '제주시',
  //     rating: 8.8,
  //     reviews: 720,
  //     originalPrice: '250,000원',
  //     discountRate: '15%',
  //     discountedPrice: '212,500원',
  //     image: '/HotelList/호텔2.jpg'
  //   }
  // ];


  // 무한 스크롤
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);
  
  const [hotels, setHotels] = useState([]);

  // 더미 데이터 생성 함수
  const generateHotels = (page) => {
    const newHotels = Array(10).fill().map((_, index) => ({
      id: (page - 1) * 10 + index + 1,
      rank: '블랙·5성급·호텔',
      name: '제주신라호텔',
      location: '서귀포시',
      rating: 9.6,
      reviews: 901,
      originalPrice: '300,000원',
      discountRate: '10%',
      discountedPrice: '270,000원',
      image: '/HotelList/호텔1.jpg'
    }));
    return newHotels;
  };

  // 호텔 데이터를 로드하는 함수
  const loadMoreHotels = () => {
    const newHotels = generateHotels(page);
    setHotels((prevHotels) => [...prevHotels, ...newHotels]);
    setPage((prevPage) => prevPage + 1);
  };

  // useEffect로 뷰포트에 들어갈 때마다 더 많은 호텔을 로드
  useEffect(() => {
    if (inView) {
      loadMoreHotels();
    }
  }, [inView]);

  // 초기 로드
  useEffect(() => {
    loadMoreHotels();
  }, []);
  

  return (
    <Container className='hotel--list'>
      <div className='HotelGrid'>

        {/* 반복문 예시 */}
        {/* {hotels.map((hotel) => (
          <div className='HotelRow' key={hotel.id 호텔 넘버}>
            <div className='HotelCol'>
              <img src={hotel.image 호텔 이미지} className='HotelImg' />
              <div className='HotelInfo'>
                <div className='HotelRank'>{hotel.rank 호텔 몇성}</div>
                <div className='HotelName'>{hotel.name 호텔 이름}</div>
                <div className='HotelLo'>{hotel.location 호텔 주소(시만)}</div>
                <div className='StarDiv'>
                  <div className='Star'>
                    <FaStar className='StarIcon' />
                    <div className='StarNum'>{hotel.rating 호텔 별점}</div>
                  </div>
                  <span className='StarCount'>{hotel.reviews 호텔 리뷰 수}명 평가</span>
                </div>
              </div>
              <div className='HotelPrice'>
                <div className='RealPrice'>{hotel.originalPrice 호텔 원래 가격}</div>
                <div className='HotelDiscount'>
                  <div className='Discount'>{hotel.discountRate 호텔 할인률}</div>
                  <div className='DiscountPrice'>{hotel.discountedPrice 호텔 할인된 가격}</div>
                </div>
              </div>
            </div>
            <div className='RowLine'></div>
          </div>
        ))} */}

        {hotels.map((hotel) => (
          <div className='HotelRow' key={hotel.id}>
            <div className='HotelCol'>
              <img src={hotel.image} className='HotelImg' />
              <div className='HotelInfo'>
                <div className='HotelRank'>{hotel.rank}</div>
                <div className='HotelName'>{hotel.name}{hotel.id}</div>
                <div className='HotelLo'>{hotel.location}</div>
                <div className='StarDiv'>
                  <div className='Star'>
                    <FaStar className='StarIcon' />
                    <div className='StarNum'>{hotel.rating}</div>
                  </div>
                  <span className='StarCount'>{hotel.reviews}명 평가</span>
                </div>
              </div>
              <div className='HotelPrice'>
                <div className='RealPrice'>{hotel.originalPrice}</div>
                <div className='HotelDiscount'>
                  <div className='Discount'>{hotel.discountRate}</div>
                  <div className='DiscountPrice'>{hotel.discountedPrice}</div>
                </div>
              </div>
            </div>
            <div className='RowLine'></div>
          </div>
        ))}
        {/* 뷰포트 안에 들어오면 더 많은 데이터를 로드 */}
        <div ref={ref} style={{ height: '1px' }} />

      </div>
    </Container>
  )
}
