import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { useInView } from 'react-intersection-observer'; // 무한 스크롤
import 'bootstrap/dist/css/bootstrap.css'
import HotelFilter from '../../componets/Hotel/HotelFilter';
import HotelModal from '../../componets/Hotel/HotelModal';
import HotelGrid from '../../componets/Hotel/HotelGrid';
import CompHeaderGeneral from '../../componets/Header/CompHeaderGeneral';
import CompSearchBox from '../../componets/Search/CompSearchBox';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NavTop from '../../componets/NavToTop/NavTop';
import Navbar from '../../componets/Navbar/Navbar';

export default function HotelList(props) {

  //////////////////////////////////////////////////////////////////////////////JIP1030
  const today = new Date(); //오늘 날짜
  //////////////////////////////////////////////////////////for default parameters
  //홈에서 검색을 안하고 /hotelList url로 치고 들어올 경우 parameter가 없을 수 있음
  //useState로 설정하니깐 오류남 ???
  let place = '';
  let check_in = new Date(today); //오늘 + 1(tomorrow)
  check_in.setDate(today.getDate() + 1);
  let check_out = new Date(check_in); //오늘 + 1 + 1(the day after tomorrow)
  check_out.setDate(check_in.getDate() + 1);
  let member = 2;

  const location = useLocation(); //uri에서 가져오기
  //console.log(location);
  //console.log(location.pathname);
  try {//uri -> parameter 가져와서 decoding -> '&' 구분자로 split
    const parameters = decodeURI(location.search).split('&');
    //parameters 배열에서 각각 '=' 구분자로 split
    place = parameters[0].split('=')[1];
    check_in = new Date(parameters[1].split('=')[1]);
    check_out = new Date(parameters[2].split('=')[1]);
    member = parameters[3].split('=')[1];
  } catch (error) {
    place = ''; //try구문에서 place부터 에러가 나서, 미지정 시 place = undefined가 됨
  }
  //////////////////////////////////////////////////////////for default parameters
  const [resultCount, setResultCount] = useState(0);  //검색 결과 개수
  //////////////////////////////////////////////////////////for detail parameters(filter&sort)
  const [excSoldOut, setExcSoldOut] = useState(0); //0: 전체 보기, 1: 매진 제외
  const [minRoomPrice, setMinRoomPrice] = useState(0);
  const [maxRoomPrice, setMaxRoomPrice] = useState(1000000);
  const [viewDiscount, setViewDiscount] = useState(0);//0: 전체 보기, 1: 할인 중만
  const [hotelRating, setHotelRating] = useState([]);
  const [catchall, setCatchall] = useState([]);
  const [sortOption, setSortOption] = useState('평점 높은 순'); //정렬 옵션

  // 필터 모달에서 '적용' 버튼 클릭 시 호출
  const filterModalCallsMe = (isSoldOutExcluded, minValue, maxValue, onlyDiscount, ratings, amenities) => {
    isSoldOutExcluded ? setExcSoldOut(1) : setExcSoldOut(0);
    setMinRoomPrice(minValue);
    setMaxRoomPrice(maxValue);
    onlyDiscount ? setViewDiscount(1) : setViewDiscount(0);
    setHotelRating(ratings);//서버에서 Array 타입으로 받음
    setCatchall(amenities);//서버에서 Array 타입으로 받음
  }
  //////////////////////////////////////////////////////////for detail parameters(filter&sort)
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
  const getHotelList = async () => {
    try {
      //Date -> String 변환
      const checkIn = check_in.getFullYear().toString() + '-' + (check_in.getMonth() + 1).toString().padStart(2, '0') + '-' + check_in.getDate().toString().padStart(2, '0');
      const checkOut = check_out.getFullYear().toString() + '-' + (check_out.getMonth() + 1).toString().padStart(2, '0') + '-' + check_out.getDate().toString().padStart(2, '0');

      console.log(`place: ${place} member: ${member}`);
      console.log(`checkIn: ${checkIn} checkOut: ${checkOut}`);
      console.log(`minRoonPrice: ${minRoomPrice} maxRoomPrice: ${maxRoomPrice}`);
      console.log(`excSoldOut: ${excSoldOut}`);
      console.log(`viewDiscount: ${viewDiscount}`);
      console.log(`hotelRating: ${hotelRating}`);
      console.log(`amenities: ${catchall}`);
      console.log(`sort: ${sortOption}`);
      
      let uri = 'http://localhost:9090/testhotel';
      uri += `?hotelsearch=${place}&checkIn=${checkIn}&checkOut=${checkOut}&roomPeopleInfo=${member}`;
      uri += `&minRoomPrice=${minRoomPrice}&maxRoomPrice=${maxRoomPrice}`;
      uri += `&soldOut=${excSoldOut}&roomDiscountState=${viewDiscount}`;
      uri += `&hotelRating=${hotelRating}&hotelAmenities=${catchall}`;
      uri += `&sort=${sortOption}`;

      // async&await이나 then()은 같은 것
      const response = await axios.get(uri);
      //response가 오면
      if (response.status === 200) {//HttpStatus.OK
        console.log(response.data[0]);
        setHotels(response.data);
        setResultCount(response.data.length);
      }
    } catch (error) {
      console.log(error);
      //alert('서버와 통신이 원활하지 않습니다.');
      //window.location.href='/';
    }
  }

  useEffect(() => {//필터&정렬 조건이 바뀔 때마다 server에 다시 request
    getHotelList();
  }, [minRoomPrice, maxRoomPrice, excSoldOut, viewDiscount, hotelRating, catchall, sortOption]);
  //////////////////////////////////////////////////////////////////////////////JIP1030


  // 무한 스크롤
  const [ref, inView] = useInView();
  const [hotels, setHotels] = useState([]); // 로딩된 호텔 목록
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부


  // 페이지별 데이터 로딩 함수
  const loadMoreHotels = () => {
    //////////////////////////////////////////////////1028JIP: hotel -> hotels로 바꿈!
    const newHotels = hotels.slice((page - 1) * 5, page * 5); // 5개씩 가져오기

    if (newHotels.length === 0) {
      setHasMore(false); // 더 이상 데이터가 없으면 종료
    } else {
      setHotels((prevHotels) => [...prevHotels, ...newHotels]); // 기존 데이터에 추가
      setPage((prevPage) => prevPage + 1); // 다음 페이지로 증가
    }
  };

  // 뷰포트에 들어올 때마다 데이터 로드
  useEffect(() => {
    if (inView && hasMore) {
      loadMoreHotels();
    }
  }, [inView, hasMore]);


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

      <HotelFilter place={place} resultCount={resultCount} handleShow={handleShow} callParent={(fromFilter) => setSortOption(fromFilter)} />

      <HotelModal gf={props} show={show} handleClose={handleClose} callParent={filterModalCallsMe} />

      <HotelGrid hotels={hotels} check_in={check_in} check_out={check_out} member={member} />


      {/* 뷰포트 안에 들어오면 더 많은 데이터를 로드 */}
      {hasMore ? <div ref={ref} style={{ height: '1px' }} /> : <p id='NoHotel'>더 이상 호텔이 없습니다.</p>}

      <NavTop />
      <Navbar />

    </Container>
  )
}