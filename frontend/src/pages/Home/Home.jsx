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
                axios.post('http://localhost:9090/eventMain'),
                axios.post('http://localhost:9090/hotHotlesMain'),
                axios.post('http://localhost:9090/locationMain'),
                axios.post('http://localhost:9090/triphotelsMain'),
                axios.post('http://localhost:9090/discountHotelMain')
            ]);

            setEventList(eventResp.data);
            setHotelList(hotelResp.data);
            setLocationList(locationResp.data);
            setLocationHotelList(locationHotelResp.data);
            setDCHotelList(DCHotelResp.data)

            console.log(eventResp.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    ////////////////////////////////////////JIP1017
    const today = new Date(); //오늘 날짜
    const check_in = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1
    const check_out = new Date(today.setDate(today.getDate() + 1)); //오늘 + 1 + 1

    // searchBox(Modal)이 열렸니?
    const [searchBoxShow, setSearchBoxShow] = useState(false);
    ////////////////////////////////////////JIP1017
    return (
        <div className="home--container">
            <div className="logo">
                <h1>로스테이</h1>
            </div>

            <div className="search--btn--wrap">
                <button
                    className="search--btn"
                    onClick={() => setSearchBoxShow(true)}
                >
                    {/* button onClick: JIP1017 */}
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
            <LocationCarousel locationList={locationList} />

            {/* 여행질별 숙소 리스트 */}
            <h2>여행지별 숙소</h2>
            <LocationHotelCarousel locationHotelList={locationHotelList} />

            {/* 특가 숙소 리스트 */}
            <h2>
                <span className="hotel--sale">What?!</span> 특가야 가자
            </h2>
            <HotelCarousel hotelList={DCHotelList} />

            <Footer />

            <Navbar />

            {/* searchBox(Modal) JIP1017 */}
            <CompSearchBox
                show={searchBoxShow}
                onHide={() => {
                    setSearchBoxShow(false);
                }}
                place={""}
                check_in={check_in}
                check_out={check_out}
                member={2} //default
                focus={"input_place"}
            />
        </div>
    );
}
