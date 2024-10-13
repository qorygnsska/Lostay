import React, { useEffect, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { FaStar } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
import { CiRedo } from "react-icons/ci";

import { Range } from 'react-range'; // 슬라이더
import { useInView } from 'react-intersection-observer'; // 무한 스크롤
import 'bootstrap/dist/css/bootstrap.css'
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


  // 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 슬라이더
  const [minValue, setMinValue] = useState(0); // 초기 최소값
  const [maxValue, setMaxValue] = useState(500000); // 초기 최대값
  
  // 버튼
  const rankBtn = ['5성급', '4성급', '블랙', '리조트', '가족호텔'];
  const bedBtn = ['싱글', '더블', '트윈', '온돌'];
  const publicBtn = [
    '사우나', '수영장', '레스토랑', '라운지', '피트니스',
    '골프장', '엘리베이터', '공용PC', '바베큐', '카페',
    '공용스파', '편의점', '노래방', '주방/식당', '세탁기',
    '건조기', '탈수기', '주차장', '취사가능', '공용샤워실',
    '온천', '스키장'
  ];
  const roomBtn = [
    '객실스파', '미니바', '무선인터넷', '욕실용품', 'TV',
    '에어컨', '냉장고', '샤워실', '욕조', '드라이기',
    '다리미', '전기밥솥'
  ];
  const otherBtn = [
    '조식제공', '무료주차', '객실내취사', '반려견동반',
    '객실내흡연', '발렛파킹', '금연', '프린터사용',
    '짐보관가능', '픽업서비스', '캠프파이어', '카드결제',
    '장애인편의'
  ];

  return (
    <Container className='hotel--list'>

      <div className='HotelFilter'>
        <div className='SearchCount'>'제주도' 검색 결과 158개</div>
        <div onClick={handleShow} className='FilterIcon'>
          <FaFilter /> 필터
        </div>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className='Filter'>
        <Modal.Header>
          <Modal.Title>필터</Modal.Title>
          <div>초기화<CiRedo /></div>
          
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='SoldOutF border-bottom pb-3 mb-3 d-flex'>
              <span>매진 숙소 제외</span>
              <Form.Check type="switch" id="custom-switch"/>
            </div>

            <div className='PriceF border-bottom pb-3 mb-3'>
              <Form.Label>
                가격: {minValue.toLocaleString()}원 - {maxValue.toLocaleString()}원
              </Form.Label>

              <Range
                step={50000}
                min={0} // 슬라이더 최소값 (왼쪽 슬라이더)
                max={500000} // 슬라이더 최대값 (오른쪽 슬라이더)
                values={[minValue, maxValue]} // 현재 값 배열
                onChange={(values) => {
                  const newMin = Math.max(values[0], 0); // 최소값은 0으로 제한
                  const newMax = Math.min(values[1], 500000); // 최대값은 500,000으로 제한
                  
                  // 왼쪽 슬라이더는 오른쪽 슬라이더보다 50,000 작게 설정
                  if (newMax - 50000 >= newMin) {
                    setMinValue(newMin); // 왼쪽 슬라이더 값 업데이트
                    setMaxValue(newMax); // 오른쪽 슬라이더 값 업데이트
                  }
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      height: '6px',
                      width: '100%',
                      backgroundColor: '#ddd',
                      position: 'relative'
                    }}
                  >
                    {/* 핸들 사이의 바 색상 */}
                    <div
                      style={{
                        position: 'absolute',
                        height: '6px',
                        left: `${(minValue / 500000) * 100}%`, // 왼쪽 핸들의 위치
                        right: `${(500000 - maxValue) / 500000 * 100}%`, // 오른쪽 핸들의 위치
                        backgroundColor: '#007bff',
                        transition: 'left 0.2s ease, right 0.2s ease'
                        
                      }}
                    />
                    {children} {/* 슬라이더 핸들 */}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    style={{
                      height: '16px',
                      width: '16px',
                      backgroundColor: '#ffffff', 
                      borderRadius: '50%', 
                      cursor: 'pointer', 
                      position: 'absolute', 
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', 
                      transition: 'transform 0.2s ease'
                    }}
                  >
                  </div>
                )}
              />
              
            </div>
            <div className='EventF border-bottom pb-3 mb-3'>
              <p>할인혜택</p>
              <Button variant="light" name='할인특가'>할인특가</Button>
            </div>

            <div className='RankF border-bottom pb-3 mb-3'>
              <p>등급</p>
              {rankBtn.map(name => (
                <input type='button' value={name} key={name} name={name} id='BtnF'/>
              ))}
            </div>

            <div className='BedF border-bottom pb-3 mb-3'>
              <p>베드타입</p>
              {bedBtn.map(name => (
                <Button variant="light" name={name} key={name} className="m-2">
                  {name}
                </Button>
              ))}
            </div>

            <div className='PublicF border-bottom pb-3 mb-3'>
              <p>공용시설</p>
              {publicBtn.map(name => (
                <Button variant="light" name={name} key={name} className="m-2">
                  {name}
                </Button>
              ))}
            </div>

            <div className='RoomF border-bottom pb-3 mb-3'>
              <p>객실 내 시설</p>
              {roomBtn.map(name => (
                <Button variant="light" name={name} key={name} className="m-2">
                  {name}
                </Button>
              ))}
            </div>

            <div className='OtherF'>
              <p>기타 시설</p>
              {otherBtn.map(name => (
                <Button variant="light" name={name} key={name} className="m-2">
                  {name}
                </Button>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>닫기</Button>
          <Button variant="primary">적용</Button>
        </Modal.Footer>
      </Modal>

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
