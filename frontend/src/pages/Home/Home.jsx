import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventCarousel from '../../componets/Carousel/EventCarousel';
import HotelCarousel from '../../componets/Carousel/HotelCarousel';
import MetropolitanCarousel from '../../componets/Carousel/MetropolitanCarousel';
import MetropolitanHotelCarousel from '../../componets/Carousel/MetropolitanHotelCarousel';
import Footer from '../../componets/Footer/Footer';
import Navbar from '../../componets/Navbar/Navbar';
import CompSearchBox from '../../componets/Search/CompSearchBox';

export default function Home() {


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await instance.get('/api/some-endpoint'); // Replace with your actual endpoint
    //             // Handle response data here
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error('API 요청 실패:', error);
    //             if (error.response && error.response.status === 401) {
    //                 console.log('토큰이 만료되었거나 유효하지 않습니다.');
    //                 // Redirect to login or handle accordingly
    //             }
    //         }
    //     };

    //     fetchData();
    // }, []);

    const images = ['66fac140e8c113.870765961_1.png'
        , '66fac140e8c113.870765961_2.png'
        , '66fac140e8c113.870765961_3.png'
        , '66fac140e8c113.870765961_4.png'
        , '66fac140e8c113.870765961_5.png'
        , '66fac140e8c113.870765961_6.png']; // 이미지 상태 초기화

    const hotelList = [
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '3등급', hotelName: '구월 호텔반월', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 8, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '롯데 시티호텔 울산', reviewAvg: 4.7, reviewCnt: 3015, oriPrice: 72800, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '3등급', hotelName: '스탠포드 호텔', reviewAvg: 4.6, reviewCnt: 303, oriPrice: 390000, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '3등급', hotelName: '세인트존스 호텔', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 20, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '2등급', hotelName: '호텔 U5', reviewAvg: 4.2, reviewCnt: 150, oriPrice: 108000, discount: 4, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '스카이베이호텔 경포', reviewAvg: 4.1, reviewCnt: 1220, oriPrice: 405000, discount: 5, discountPrice: 100000 }
    ]; // 이미지 상태 초기화

    const metropolitanList = [
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', metropolitanName: '제주도' },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', metropolitanName: '부산' },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', metropolitanName: '인천' },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', metropolitanName: '울산' },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', metropolitanName: '서울' },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', metropolitanName: '대구' },
        { image: '66fac140e8c113.870765961_1.png', metropolitanName: '광주' },
        { image: '66fac140e8c113.870765961_1.png', metropolitanName: '대전' },

    ];


    const metropolitanHotelList = [{
        id: 1,
        metropolitan: '인천',
        hotelList: [{ image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '인천1', hotelName: '구월 호텔반월', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 8, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '인천2', hotelName: '롯데 시티호텔 울산', reviewAvg: 4.7, reviewCnt: 3015, oriPrice: 72800, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '인천3', hotelName: '스탠포드 호텔', reviewAvg: 4.6, reviewCnt: 303, oriPrice: 390000, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '인천4', hotelName: '세인트존스 호텔', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 20, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '인천5', hotelName: '호텔 U5', reviewAvg: 4.2, reviewCnt: 150, oriPrice: 108000, discount: 4, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '스카이베이호텔 경포', reviewAvg: 4.1, reviewCnt: 1220, oriPrice: 405000, discount: 5, discountPrice: 100000 }
        ]
    },
    {
        id: 2,
        metropolitan: '대전',
        hotelList: [{ image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '대전1', hotelName: '구월 호텔반월', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 8, discountPrice: 100000 },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '대전2', hotelName: '롯데 시티호텔 울산', reviewAvg: 4.7, reviewCnt: 3015, oriPrice: 72800, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '3등급', hotelName: '스탠포드 호텔', reviewAvg: 4.6, reviewCnt: 303, oriPrice: 390000, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '대전4', hotelName: '세인트존스 호텔', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 20, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '2등급', hotelName: '호텔 U5', reviewAvg: 4.2, reviewCnt: 150, oriPrice: 108000, discount: 4, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '스카이베이호텔 경포', reviewAvg: 4.1, reviewCnt: 1220, oriPrice: 405000, discount: 5, discountPrice: 100000 }
        ]
    },
    {
        id: 3,
        metropolitan: '부산',
        hotelList: [{ image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '부산1', hotelName: '구월 호텔반월', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 8, discountPrice: 100000 },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '5등급', hotelName: '롯데 시티호텔 울산', reviewAvg: 4.7, reviewCnt: 3015, oriPrice: 72800, discount: 0, discountPrice: 100000 },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '3등급', hotelName: '스탠포드 호텔', reviewAvg: 4.6, reviewCnt: 303, oriPrice: 390000, discount: 0, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '부산4', hotelName: '세인트존스 호텔', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 20, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '2등급', hotelName: '호텔 U5', reviewAvg: 4.2, reviewCnt: 150, oriPrice: 108000, discount: 4, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '스카이베이호텔 경포', reviewAvg: 4.1, reviewCnt: 1220, oriPrice: 405000, discount: 5, discountPrice: 100000 }
        ]
    },
    {
        id: 4,
        metropolitan: '대구',
        hotelList: [{ image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '대구1', hotelName: '구월 호텔반월', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 8, discountPrice: 100000 },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '대구2', hotelName: '롯데 시티호텔 울산', reviewAvg: 4.7, reviewCnt: 3015, oriPrice: 72800, discount: 0, discountPrice: 100000 },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '3등급', hotelName: '스탠포드 호텔', reviewAvg: 4.6, reviewCnt: 303, oriPrice: 390000, discount: 0, discountPrice: 100000 },
        { image: '2e8d99db81c7bde9a4f9cb703b0d7e52.webp', hotelRating: '대구4', hotelName: '세인트존스 호텔', reviewAvg: 4.9, reviewCnt: 122, oriPrice: 208000, discount: 20, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '2등급', hotelName: '호텔 U5', reviewAvg: 4.2, reviewCnt: 150, oriPrice: 108000, discount: 4, discountPrice: 100000 },
        { image: '66fac140e8c113.870765961_1.png', hotelRating: '5등급', hotelName: '스카이베이호텔 경포', reviewAvg: 4.1, reviewCnt: 1220, oriPrice: 405000, discount: 5, discountPrice: 100000 }
        ]
    },

    ];



    ////////////////////////////////////////JIP1017
    const today = new Date(); //오늘 날짜
    const check_in = new Date(today.setDate(today.getDate() + 1));   //default: 내일 날짜
    const check_out = new Date(today.setDate(today.getDate() + 2));  //default: 모레 날짜

    // searchBox(Modal)이 열렸니?
    const [searchBoxShow, setSearchBoxShow] = useState(false);
    ////////////////////////////////////////JIP1017


    return (
        <div className='home--container'>
            <div className='logo'>
                <h1>로스테이</h1>
            </div>

            <div className='search--btn--wrap'>
                <button className='search--btn' onClick={() => setSearchBoxShow(true)}>
                    {/* button onClick: JIP1017 */}
                    <IoSearchOutline />
                    <span>여행지나 숙소를 검색해보세요.</span>
                </button>
            </div>

            {/* 이벤트 리스트 */}
            <EventCarousel images={images} />

            {/* 최근 HOT 호텔 리스트 */}
            <h2><span className='hotel--popular'>최근 HOT</span> 인기호텔</h2>
            <HotelCarousel hotelList={hotelList} />

            {/* 국내 인기 여행 리스트 */}
            <h2>국내 인기 여행지</h2>
            <MetropolitanCarousel metropolitanList={metropolitanList} />

            {/* 여행질별 숙소 리스트 */}
            <h2>여행지별 숙소</h2>
            <MetropolitanHotelCarousel metropolitanHotelList={metropolitanHotelList} />

            {/* 특가 숙소 리스트 */}
            <h2><span className='hotel--sale'>What?!</span> 특가야 가자</h2>
            <HotelCarousel hotelList={hotelList} />

            <div>
                <Footer />
            </div>

            <div>
                <Navbar />
            </div>

            {/* searchBox(Modal) JIP1017 */}
            <CompSearchBox
                show={searchBoxShow}
                onHide={() => { setSearchBoxShow(false) }}
                place={''}
                check_in={check_in}
                check_out={check_out}
                member={2}  //default
                focus={'input_place'}
            />


        </div>
    )
}