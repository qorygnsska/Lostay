import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AWS from 'aws-sdk';

<<<<<<< HEAD
export default function KakaoApiShare({ title, address, Thumbnail }) {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState(null);
  const webUrl = `${window.location.origin}${location.pathname}`;
=======
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
  if(search !== '') { //넘어온 값이 있을 경우
    ucheckInDate = new URLSearchParams(search).get('checkInDate'); // url에서 값 가져오기
    ucheckOutDate = new URLSearchParams(search).get('checkOutDate');
    upeopleMax = new URLSearchParams(search).get('peopleMax');
  }

  const parameters = useParams();
  const check_in = new Date(ucheckInDate);
  const check_out = new Date(ucheckOutDate);
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
      const response = await axios.get('http://localhost:9090/room/HotelRoomList', {
        params: { hotelNo, checkInDate, checkOutDate, peopleMax },
      });
      setRoomInfos(response.data);  // 성공 시 응답 데이터를 RoomInfos에 저장
    } catch (error) {
      setError(error);  // 오류가 발생한 경우 에러 저장
    } finally {
      setLoading(false);  // 로딩 상태 종료
    }
  };

  // 룸리스트 리뷰3개 가져오기
  const fetchHotelRoomListReview3 = async () => {
    try {
      const response = await axios.get('http://localhost:9090/review/InquireRoom3', {
        params: { hotelNo },
      });
      setRoomReviews(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
>>>>>>> master

  useEffect(() => {
    // AWS S3 설정
    AWS.config.update({
      // region: process.env.REACT_APP_S3_REGION,
      // accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
      // secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
    });

    // S3 객체 생성
    const s3 = new AWS.S3();

    // Thumbnail이 정의되어 있을 때만 실행
    if (Thumbnail) {
      const uploadImageToS3 = async () => {
        try {
          const response = await fetch(`http://localhost:3000/${Thumbnail}`);
          const blob = await response.blob();

          const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
            Key: `thumbnails/${Thumbnail.split('/').pop()}`, // 파일명 추출
            Body: blob,
            ACL: 'public-read',
            ContentType: 'image/webp', // 파일 형식 지정
          };

          s3.upload(params, (err, data) => {
            if (err) {
              console.error('S3 업로드 실패:', err);
            } else {
              console.log('S3 업로드 성공:', data.Location);
              setImageUrl(data.Location); // 업로드된 이미지 URL 저장
            }
          });
        } catch (error) {
          console.error('이미지 가져오기 실패:', error);
        }
      };

      uploadImageToS3();
    } else {
      console.error("Thumbnail is undefined");
    }

    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('6ce94ba3ce787fda2efe59c95e6bc036'); // 카카오톡 앱 JavaScript 키
    }
  }, [Thumbnail]); // Thumbnail이 변경될 때마다 실행

<<<<<<< HEAD
  const handleShare = (event) => {
    event.preventDefault(); // 기본 동작 방지
    console.log(title, address, imageUrl);
  
    if (window.Kakao && imageUrl) {
      window.Kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        content: {
          title: title,
          description: address,
          imageUrl: imageUrl,
          link: {
            webUrl: webUrl,
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              webUrl: webUrl,
            },
          },
        ],
      });
    } else {
      console.error("Kakao is not initialized or imageUrl is not available");
    }
  };

  return (
    <div>
      <a id="kakaotalk-sharing-btn" href="javascript" onClick={handleShare}>
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유하기 버튼"
        />
      </a>
      {imageUrl && <img src={imageUrl} alt="Uploaded Thumbnail" style={{ display: 'none' }} />}
    </div>
  );
}
=======
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
        <KakaoApiShare
          title={RoomInfos.dto.hotelName}
          address={RoomInfos.dto.hotelAdress}
          Thumbnail={RoomInfos.dto.hotelThumbnail}

        />  {/* 카카오 공유 api */}

        {Heart ? <IoMdHeart className='FullHeartIcon' onClick={handlerCart} /> : <IoIosHeartEmpty className='HeartIcon' onClick={handlerCart} />}
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
      </div>

      <div className='RLtitle'>객실선택</div>

      {displayedRooms.map((rooms, idx) => (
        <RoomGrid rooms={rooms} checkInDate={checkInDate} checkOutDate={checkOutDate} peopleMax={peopleMax} key={idx} />
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
>>>>>>> master
