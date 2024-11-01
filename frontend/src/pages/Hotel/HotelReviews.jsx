import React, { useEffect, useState } from 'react'
import { Container} from 'react-bootstrap'
import { FaStar } from "react-icons/fa";

import Footer from '../../componets/Footer/Footer';

import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrDown } from "react-icons/gr";
import ReImgModal from '../../componets/HotelReview/ReImgModal';
import AllImgModal from '../../componets/HotelReview/AllImgModal';
import RoomFilterModal from '../../componets/HotelReview/RoomFilterModal';
import RoomOrderModal from '../../componets/HotelReview/RoomOrderModal';

import BackNav from "../../componets/BackNav/BackNav";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCarousel2 from '../../componets/HotelReview/ReviewCarousel2';

export default function HotelReviews() {

    const [Reviews, setReviews] = useState();  // 객실 정보를 저장할 state
    const [error, setError] = useState(null);        // 에러 핸들링을 위한 state
    const [loading, setLoading] = useState(true);    // 로딩 상태 관리

    const {hotelNo, roomNoo} = useParams();
    const [sort, Setsort] = useState('최신 작성 순'); // url에서 값 가져오기
    const [roomNo, SetroomNo] = useState(roomNoo);

    // 호텔전체리뷰 가져오기
    const fetchHotelReview = async () => {
        try {
          const response = await axios.get('http://localhost:9090/HotelReviews', {
            params: { hotelNo, roomNo, sort },
          });
          setReviews(response.data);  // 성공 시 응답 데이터를 RoomInfos에 저장
          console.log(response.data)
        } catch (error) {
          setError(error);  // 오류가 발생한 경우 에러 저장
        } finally {
          setLoading(false);  // 로딩 상태 종료
        }
    };

    useEffect(() => {
        fetchHotelReview();  // 함수 호출
    }, [roomNo, sort]);

    const allImages = Reviews?.hotelInfo.reviewImgs;

    const [ImgIdx, setImgIdx] = useState(0); // 이미지 인덱스

    const [images, setImages] = useState([]);

    

    // 사진 전체보기 캐러셀
    const handleImageClick = (idx, img) => {
        setImgIdx(idx); // 선택한 이미지의 인덱스를 저장
        setShow(true); // 모달 열기
        setImages(img);
    };

    // 캐러셀 모달
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // 전체보기 모달
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const AllClick = () => {
        setShow2(true);
    }

    // 룸 필터 모달
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const filterClick = () => {
        setShow3(true);
    }
    const [ChoiceRoom, setChoiceRoom] = useState();
    useEffect(() => {
        if (Reviews) {
            const roomName = roomNo === '0' ? '객실 전체' : Reviews.hotelInfo.hotelRoom[Number(roomNo) - 1].roomName;
            setChoiceRoom(roomName);
        }
    }, [Reviews, roomNo]);
    
    const ClickRoom = (roomName, roomNo) => {
        setChoiceRoom(roomName);
        SetroomNo(roomNo);
        handleClose3();
    }


    // 룸 정렬 모달
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const orderClick = () => {
        setShow4(true);
    }
    const Orders = ['최신 작성 순', '평점 높은 순', '평점 낮은 순'];
    const ClickOrder = (order) => {
        Setsort(order);
        handleClose4();
    }


    // 사진 후기만 보기
    const [OnlyImg, setOnlyImg] = useState(false);

    const ClickOnlyImg = () => {
        OnlyImg ? setOnlyImg(false) : setOnlyImg(true);
        
    }
    // 사진만 담거나 전체 담기
    const [CustomImg, SetCustomImg] = useState();

    useEffect(() => {
        if(OnlyImg){
            if(Reviews){
                const custom = Reviews.reviews.filter(review => review.reviewImg.length > 0);
                SetCustomImg(custom);
            }
        }else{
            if(Reviews){
                const custom = Reviews.reviews;
                SetCustomImg(custom);
            }
        }  
    }, [OnlyImg, Reviews])

    
    if(!Reviews){
        <div>없어</div>
    }else{

        return (

            <Container className='hotel--reviews--container'>
                <BackNav title={`리뷰 (${Reviews.hotelInfo.totalReviewCount})`} />
    
                <div className='starTitle'>숙소 평점</div>
                <div className='starDiv'><FaStar className='star' /> {Reviews.hotelInfo.reviewRating.toFixed(1)}</div>
    
                <div className='AllDiv'>
                    <div className='AllImgTitle'>숙소 리뷰사진</div>
                    <div className='AllShow' onClick={AllClick}>전체보기({allImages.length})<GrNext/></div>
                </div>
    
                <div className='AllImgDiv'>
                    {/* <div className='prevBtn'><GrPrevious/></div> */}

                    <ReviewCarousel2 images={allImages} handleImageSelect={handleImageClick} />
            
                    {/* {allImages.map((img, idx) => (
                        <img src={'../../' + img} key={idx} alt='리뷰총이미지' className='AllImg' onClick={() => handleImageClick(idx, allImages)}/>
                    ))} */}
               
                    {/* <div className='nextBtn'><GrNext/></div> */}
                </div>
    
                <div className='RowLine'></div>
    
                <div className='RoomFilter' onClick={filterClick}>
                    <div className='RoomFilterName'>{ChoiceRoom}</div>
                    <div><GrDown/></div>
                </div>
    
    
                <div className='RoomFilter2'>
                    <div><input type='checkbox' className='ImgCheck' onClick={ClickOnlyImg}/> 사진후기만 보기</div>
                    <div className='RoomFilterName2' onClick={orderClick}>{sort} <GrDown/></div>
                </div>
    
                <div className='RowLine'></div>
    
                <div className='ReviewGrid'>
    
                    {CustomImg?.map((review, idx) => (
                        <div key={idx}>
                            <div className='SDBox'>
                                <div className='StarDiv'><FaStar className='ReviewStar'/>{review.reviewRating.toFixed(1)}</div>
                                <div className='ReviewDate'>{review.reviewCreateAt.slice(0, 10)}</div>
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
                                    <ReviewCarousel2 images={review.reviewImg} handleImageSelect={handleImageClick} />
                                </div>
                            )}
                            
                            <div className='RowLine'></div>
                        </div>
                    ))}
                    
                </div>
    
    
                <AllImgModal imgs={allImages} show={show2} handleClose={handleClose2}/>
    
                <ReImgModal imgs={images} show={show} ImgIdx={ImgIdx} handleClose={handleClose}/>
    
                <RoomFilterModal show={show3} handleClose={handleClose3} rooms={Reviews.hotelInfo.hotelRoom} ChoiceRoom={ChoiceRoom} ClickRoom={ClickRoom}/>
    
                <RoomOrderModal show={show4} handleClose={handleClose4} Orders={Orders} sort={sort} ClickOrder={ClickOrder}/>
    
                <Footer />
            </Container>
        )
    }
    
}