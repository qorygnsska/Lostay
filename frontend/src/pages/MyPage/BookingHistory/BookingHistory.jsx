import React, { act, useEffect, useState } from "react";
import BackNav from "../../../componets/BackNav/BackNav";
import Navbar from "../../../componets/Navbar/Navbar";
import { Dropdown, Nav } from "react-bootstrap";
import BookingHistoryCom from "../../../componets/MyPage/BookingHistory/BookingHistory";
import { Link } from "react-router-dom";
import { privateApi } from '../../../api/api'

export default function BookingHistory() {
    const setMonth = [3, 6, 12];
    const tabList = ["예약한 숙소", "이용한 숙소", "취소한 숙소"];

    // 드롭바 선택
    const [selectedDate, setSelectedDate] = useState(setMonth[0]);

    // 탭 선택
    const [tabText, setTabText] = useState(tabList[0]);
    const [activeTab, setActiveTab] = useState(0);


    const [borderStyle] = useState({ left: 0, width: 0 });

    // 가져온 데이터
    const [bookList, setBookList] = useState([]);


    const payCancle = async (payNo) => {  // async 키워드 추가
        try {
            const response = await privateApi.get(`/PaymentCancle?payNo=${payNo}`); // API 요청
            console.log(response.data);
            getDatas(activeTab)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleReviewUpdate = async (payNo, uploadImg, reviewRating, reviewContent) => {
        const formData = new FormData();

        uploadImg.forEach((file) => {
            formData.append('files', file); // 'files'는 서버에서 받을 필드 이름
        });
        formData.append('reviewRating', reviewRating); // 점수 추가
        formData.append('text', reviewContent); // 리뷰 텍스트 추가
        formData.append('payNo', payNo); // 결제 번호 추가
        try {
            const response = await privateApi.post('/UploadReviewImg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            getDatas(activeTab)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const getDatas = async (activeTab) => {
        const request = activeTab === 0 ? 'book' : activeTab === 1 ? `booked?showMonth=${selectedDate}` : `bookcancle?showMonth=${selectedDate}`;
        try {
            const response = await privateApi.get(`/bookhistory/${request}`); // API 요청
            console.log(response.data)
            setBookList(response.data)
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDatas(activeTab);
    }, [activeTab, selectedDate]);

    const handleSelect = (eventKey) => {
        setSelectedDate(setMonth[eventKey]);
    };

    const handleSelectTab = (eventKey) => {
        setActiveTab(eventKey);
        setTabText(tabList[eventKey]);
    };

    const handlePaymentCancel = async (payNo) => {
        const result = await payCancle(payNo);
        console.log('결제 취소 결과:', result);
    };


    return (
        <div className="booking--history--container">
            <BackNav title="예약 내역" />

            <div className="booking--history--wrap">
                {/* 보여줄 개월 수 선택 */}
                <div className={`dropdown--box ${activeTab !== 0 ? 'show' : ''}`}>
                    <Dropdown onSelect={handleSelect} className="dropdown">
                        <Dropdown.Toggle>최근 {selectedDate}개월</Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown--menu">
                            {setMonth.map((dateVal, idx) => (
                                <Dropdown.Item key={idx} eventKey={idx}>
                                    최근 {dateVal}개월
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* 보여줄 예약 메뉴 선택 */}
                <div className={`tab--wrap ${activeTab === 0 ? 'margin' : ''}`}>
                    <Nav fill variant="tabs" defaultActiveKey="/home">
                        {tabList.map((tabVal, idx) => (
                            <Nav.Item key={idx}>
                                <Nav.Link
                                    eventKey={idx}
                                    active={activeTab === idx}
                                    onClick={() => handleSelectTab(idx)}
                                >
                                    {tabVal}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                        <div
                            className="border-slide"
                            style={{
                                left: borderStyle.left,
                                width: borderStyle.width,
                            }}
                        />
                    </Nav>
                </div>

                {/* 정보 알림 창 */}
                {activeTab === 0 ? (
                    <div className="notify">
                        <span>
                            <strong>예약 취소 요청</strong>은 체크인 하루전까지
                            가능합니다.
                        </span>
                    </div>
                ) : activeTab === 1 ? (
                    <div className="notify">
                        <span>
                            <strong>리뷰 작성</strong>은 체크아웃 당일부터
                            일주일까지 작성 가능합니다.
                        </span>
                    </div>
                ) : null}

                {bookList.length ? ( // 예약된 상품이 있을 때
                    <div className="bookingList">
                        {bookList.map((bookData, idx) => (
                            <BookingHistoryCom key={idx} bookData={bookData} handlePaymentCancel={handlePaymentCancel} handleReviewUpdate={handleReviewUpdate} />
                        ))}
                    </div> // 예약된 상품이 없을 때
                ) : (
                    <div className="booking--none">
                        <div className="booking--none--text">
                            <span>
                                {activeTab === 0
                                    ? `${tabText}가 없습니다.`
                                    : `최근 ${selectedDate}개월 동안 ${tabText}가 없습니다.`}

                            </span>
                            <span>상품을 예약해보세요</span>
                        </div>

                        <Link to="/" className="home--btn">
                            홈으로 가기
                        </Link>
                    </div>
                )}
            </div>

            <Navbar />
        </div>
    );
}
