import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { IoNavigate } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import HotelCarousel from '../../componets/Hotel/HotelCarousel';
import HotelReview from '../../componets/Hotel/HotelReview';
import KakaoMap from '../../componets/Map/KakaoMap';
import RoomGrid from '../../componets/Room/RoomGrid';
import Footer from '../../componets/Footer/Footer';
import HotelService from '../../componets/Hotel/HotelService';
import HotelIntroduce from '../../componets/Hotel/HotelIntroduce';
import axios from 'axios';
import CompHeaderGeneral from '../../componets/Header/CompHeaderGeneral';
import CompSearchBox from '../../componets/Search/CompSearchBox';
import { useSelector } from 'react-redux';
import Navbar from '../../componets/Navbar/Navbar';
import NavTop from '../../componets/NavToTop/NavTop';
import { BsDot } from "react-icons/bs";

import KakaoApiShare from '../../componets/KakaoApi/KakaoApishare';

import { privateApi } from '../../api/api';

export default function RoomList() {

  //////////////////////////////////////////////////////////////////////////////JIP1029
  //////////////////////////////////////////////////////////for default parameters JIP1104
  const today = new Date(); //오늘 날짜
  today.setHours(0, 0, 0, 0);//오늘 날짜의 시간, 분, 초, ms를 모두 0으로 설정

  const tomorrow = new Date(today); //오늘 + 1(tomorrow)
  tomorrow.setDate(today.getDate() + 1);

  const tdat = new Date(tomorrow); //오늘 + 1 + 1(the day after tomorrow)
  tdat.setDate(tomorrow.getDate() + 1);

  //const ucheckInDate = new URLSearchParams(search).get('checkInDate'); // url에서 값 가져오기
  //const ucheckOutDate = new URLSearchParams(search).get('checkOutDate');
  //const upeopleMax = new URLSearchParams(search).get('peopleMax');

  let ucheckInDate = tomorrow;//넘어온 값이 없을 경우
  let ucheckOutDate = tdat;
  let upeopleMax = 2;

  const { search } = useLocation();
  if (search !== '') { //넘어온 값이 있을 경우
    ucheckInDate = new URLSearchParams(search).get('checkInDate'); // url에서 값 가져오기
    ucheckOutDate = new URLSearchParams(search).get('checkOutDate');
    upeopleMax = new URLSearchParams(search).get('peopleMax');
  }

  const parameters = useParams();
  const check_in = new Date(ucheckInDate);
  check_in.setHours(0, 0, 0, 0);
  const check_out = new Date(ucheckOutDate);
  check_out.setHours(0, 0, 0, 0);
  const member = upeopleMax;
  //////////////////////////////////////////////////////////for default parameters  JIP1104
  //////////////////////////////////////////////////////////for hidden & focus
  // searchBox(Modal)이 열렸니?
  const [searchBoxShow, setSearchBoxShow] = useState(false);

  // 어디서 모달 불렀니?
  const functionFromWhere = (fromWhere) => {
    console.log('where are you?: ' + fromWhere);
  }

  // Header에서 어떤 input 눌렀니?
  const [focus, setFocus] = useState('input_place');
  // input(on header) 선택 위치에 따라 focus 변경 -> 하위 모달에 focus 전달 & 모달 열기
  const functionSearchPicker = (fromMyChild) => {
    console.log(fromMyChild + ' is picked at headerGeneral');
    setFocus(fromMyChild);
    setSearchBoxShow(true);
  }
  //////////////////////////////////////////////////////////for hidden & focus
  //////////////////////////////////////////////////////////////////////////////JIP1029


  const [RoomInfos, setRoomInfos] = useState({ list: [], dto: [] });  // 객실 정보를 저장할 state
  const [RoomReviews, setRoomReviews] = useState([]);  // 리뷰 정보를 저장할 state
  const [error, setError] = useState(null);        // 에러 핸들링을 위한 state
  const [loading, setLoading] = useState(true);    // 로딩 상태 관리

  // 날짜 형식 변경
  const convertToLocalDateTime = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };


  // 기본 파라미터
  const hotelNo = parameters.hotelNo;
  const checkInDate = convertToLocalDateTime(ucheckInDate);
  const checkOutDate = convertToLocalDateTime(ucheckOutDate);
  const peopleMax = upeopleMax;

  // 룸리스트 가져오기
  const fetchHotelRoomList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/room/HotelRoomList`, {
        params: { hotelNo, checkInDate, checkOutDate, peopleMax },
      });
      setRoomInfos(response.data);  // 성공 시 응답 데이터를 RoomInfos에 저장
      console.log(response.data)
    } catch (error) {
      setError(error);  // 오류가 발생한 경우 에러 저장
    } finally {
      setLoading(false);  // 로딩 상태 종료
    }
  };

  // 룸리스트 리뷰3개 가져오기
  const fetchHotelRoomListReview3 = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/review/InquireRoom3`, {
        params: { hotelNo },
      });
      setRoomReviews(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelRoomList();
    fetchHotelRoomListReview3();
    window.scrollTo(0, 0);
  }, []);


  const [showAll, setshowAll] = useState(false);

  const displayedRooms = showAll ? RoomInfos.list : RoomInfos.list.slice(0, 10);



  const handleFindButtonClick = () => {
    const encodedLocation = encodeURIComponent(RoomInfos.dto.hotelAdress); // 주소를 URL 인코딩
    const encodedLocation2 = encodeURIComponent(RoomInfos.dto.hotelName); // 호텔이름을 URL 인코딩
    window.location.href = `/HotelMap?location=${encodedLocation}&hotelName=${encodedLocation2}`;
  };

  // 찜
  const user = useSelector((state) => state.user.userState);
  const navigate = useNavigate();

  const [Heart, SetHeart] = useState(false); // 하트 상태
  const [cartNo, SetcartNo] = useState(); // 카트넘버 저장

  // 찜 했는 지 안 했는 지 확인
  const fetchCart = async () => {
    try {
      const response = await privateApi.get(`/cart/HotelCheck?hotelNo=${hotelNo}`);
      if (response.status === 200) {
        SetHeart(true);
        SetcartNo(response.data);
      }

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user === true) {
      fetchCart();
    }
  }, [])

  // 찜 추가
  const AddCart = async () => {
    try {
      const response = await privateApi.post(`/cart/save?hotelId=${hotelNo}`);
      if (response.status === 200) {
        SetHeart(true);
        SetcartNo(response.data.cartNo);
      } else {
        SetHeart(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 찜 삭제
  const DeleteCart = async () => {
    try {
      const response = await privateApi.post(`/cart/delete?cartNo=${cartNo}`);
      if (response.status === 200) {
        SetHeart(false);
      } else {
        SetHeart(true);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 찜 눌렀을 때
  const handlerCart = () => {
    if (user === true) {
      if (Heart) {
        DeleteCart();
      } else {
        AddCart();
      }
    } else {
      alert("로그인 후 이용해주세요.");
      navigate("/login", { replace: true });
    }
  };

  return (
    <Container className='room--list'>

      {/* header w/ searchParams JIP1029 */}
      <CompHeaderGeneral
        where={functionFromWhere}
        callParent={functionSearchPicker}
        place={RoomInfos.dto.hotelName}
        check_in={check_in}
        check_out={check_out}
        member={member}
      />

      {/* searchBox(Modal) JIP1029 */}
      {RoomInfos.dto.hotelName?.length > 0 && <CompSearchBox
        show={searchBoxShow}
        onHide={() => { setSearchBoxShow(false) }}
        place={RoomInfos.dto.hotelName}
        check_in={check_in}
        check_out={check_out}
        member={member}
        focus={focus}
      />}


      {RoomInfos.dto.hotelImage?.length > 0 && <HotelCarousel images={RoomInfos.dto.hotelImage} />}

      <div className='HotelInfo'>
        <div className='HotelRN'>
          <div className='HotelRank'>{RoomInfos.dto.hotelRating}</div>
          <div className='HotelName'>{RoomInfos.dto.hotelName}</div>
        </div>

        <div className='d-flex align-self-end mb-2'>
          <KakaoApiShare
            title={RoomInfos.dto.hotelName}
            address={RoomInfos.dto.hotelAdress}
            Thumbnail={RoomInfos.dto.hotelThumbnail}

          />  {/* 카카오 공유 api */}

          {Heart ? <IoMdHeart className='FullHeartIcon' onClick={handlerCart} /> : <IoIosHeartEmpty className='HeartIcon' onClick={handlerCart} />}
        </div>
      </div>

      <div className='RowLine'></div>

      <div className='ReTitle'>호텔 리뷰</div>
      {RoomReviews.length > 0 ? (
        <HotelReview Reviews={RoomReviews} HotelInfo={RoomInfos.dto} />
      ) : (
        <div>리뷰가 없습니다.</div>
      )}



      <div className='HotelLocation'>
        <div className='LoTitle'>위치/길찾기</div>
        <span className='LoContent'>{RoomInfos.dto.hotelAdress}</span>
        <Button id='FindBtn' onClick={handleFindButtonClick}>길찾기<IoNavigate /></Button>

        {RoomInfos.dto.hotelAdress?.length > 0 && <KakaoMap Location={RoomInfos.dto.hotelAdress} />}

        <div className='LoAttract'>
          {RoomInfos.dto.hotelTouristAttraction?.map((attract, idx) => (
            <div className='AttractInfo' key={idx}><BsDot id='AttractIcon' />{attract}</div>
          ))}
        </div>
      </div>

      <div className='RLtitle'>객실선택</div>

      {displayedRooms.map((rooms, idx) => (
        <RoomGrid rooms={rooms} fetchHotelRoomList={fetchHotelRoomList} checkInDate={checkInDate} checkOutDate={checkOutDate} peopleMax={peopleMax} key={idx} hotelNo={hotelNo} />
      ))}

      {RoomInfos.list.length > 10 && !showAll && (
        <div onClick={() => setshowAll(true)} className='showAll'>객실 모두보기</div>
      )}

      <div className='RowLine'></div>

      <div className='IntroTitle'>숙소 소개</div>
      <HotelIntroduce introduce={RoomInfos.dto.hotelIntroduction} />

      <div className='RowLine'></div>

      <div className='ServiceTitle'>서비스 및 부대시설</div>
      {RoomInfos.dto.hotelAmenities?.length > 0 && <HotelService services={RoomInfos.dto.hotelAmenities} />}



      <NavTop />
      <Navbar />
      <Footer />
    </Container>


  )
}