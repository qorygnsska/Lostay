import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventCarousel from "../../componets/Carousel/EventCarousel";
import HotelCarousel from "../../componets/Carousel/HotelCarousel";
import LocationCarousel from "../../componets/Carousel/LocationCarousel";
import LocationHotelCarousel from "../../componets/Carousel/LocationHotelCarousel";
import Footer from "../../componets/Footer/Footer";
import Navbar from "../../componets/Navbar/Navbar";
import CompSearchBox from "../../componets/Search/CompSearchBox";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

export default function Home() {

    const [eventList, setEventList] = useState([]);
    const [hotelList, setHotelList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [locationHotelList, setLocationHotelList] = useState([]);
    const [DCHotelList, setDCHotelList] = useState([]);

    const getData = async () => {
        try {
            const [eventResp, hotelResp, locationResp, locationHotelResp, DCHotelResp] = await Promise.all([
                axios.get('http://localhost:9090/main/event'),
                axios.get('http://localhost:9090/main/hotHotels'),
                axios.get('http://localhost:9090/main/location'),
                axios.get('http://localhost:9090/main/triphotels'),
                axios.get('http://localhost:9090/main/discountHotel')
            ]);

            setEventList(eventResp.data);
            setHotelList(hotelResp.data);
            setLocationList(locationResp.data);
            setLocationHotelList(locationHotelResp.data);
            setDCHotelList(DCHotelResp.data)
            console.log(hotelResp.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    ////////////////////////////////////////JIP1028
    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)
    const today = new Date(); //오늘 날짜
    today.setHours(0, 0, 0, 0);//오늘 날짜의 시간, 분, 초, ms를 모두 0으로 설정

    const tomorrow = new Date(today); //오늘 + 1(tomorrow)
    tomorrow.setDate(today.getDate() + 1);

    const tdat = new Date(tomorrow); //오늘 + 1 + 1(the day after tomorrow)
    tdat.setDate(tomorrow.getDate() + 1);
    ////////////////////////////////////////////////////////////////////////////////////datePicker(calendar)
    //////////////////////////////////////////////////////////for hidden
    // searchBox(Modal)이 열렸니?
    const [searchBoxShow, setSearchBoxShow] = useState(false);
    //////////////////////////////////////////////////////////for hidden
    ////////////////////////////////////////JIP1028

    return (
        <div className="home--container">
            <div className="logo">
                <img src="Logo/logo.png" />
            </div>

            <div className="search--btn--wrap">
                <button
                    className="search--btn"
                    onClick={() => setSearchBoxShow(true)}
                >
                    <IoSearchOutline />
                    <span>여행지나 숙소를 검색해보세요.</span>
                </button>
            </div>

            {/* 이벤트 리스트 */}
            <div className="eventList--wrap">
                <h2>이벤트</h2>
                <Link to="/event-list" className="eventList">자세히 보기<FaChevronRight className="icon" /></Link>
            </div>
            <EventCarousel eventList={eventList} />

            {/* 최근 HOT 호텔 리스트 */}
            <h2>
                <span className="hotel--popular">최근 HOT</span> 인기호텔
            </h2>
            <HotelCarousel hotelList={hotelList} />

            {/* 국내 인기 여행 리스트 */}
            <h2>국내 인기 여행지</h2>
            <LocationCarousel locationList={locationList} check_in={tomorrow} check_out={tdat} member={2} />{/* JIP1030 check_in check_out 추가 */}

            {/* 여행지별 숙소 리스트 */}
            <h2>여행지별 숙소</h2>
            <LocationHotelCarousel locationHotelList={locationHotelList} />

            {/* 특가 숙소 리스트 */}
            <h2>
                <span className="hotel--sale">What?!</span> 특가야 가자
            </h2>
            <HotelCarousel hotelList={DCHotelList} />

            <Footer />

            <Navbar />

            {/* searchBox(Modal) JIP1028 */}
            <CompSearchBox
                show={searchBoxShow}
                onHide={() => { setSearchBoxShow(false) }}
                place={''} //default
                check_in={tomorrow} //default
                check_out={tdat} //default
                member={2} //default
                focus={"input_place"} //default focus
            />
        </div>
    );
}
