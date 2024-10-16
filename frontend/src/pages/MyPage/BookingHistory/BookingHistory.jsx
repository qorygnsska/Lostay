import React, { useState } from 'react'
import BackNav from '../../../componets/BackNav/BackNav';
import Navbar from '../../../componets/Navbar/Navbar';
import { Dropdown, Nav } from 'react-bootstrap';
import BookingHistoryCom from '../../../componets/MyPage/BookingHistory/BookingHistory'
import { Link } from 'react-router-dom';


export default function BookingHistory() {

    const dateList = ['최근 3개월', '최근 6개월', '최근 12개월'];
    const tabList = ['예약한 숙소', '이용한 숙소', '취소한 숙소'];

    const [selectedDate, setSelectedDate] = useState(dateList[0]);
    const [tabText, setTabText] = useState(tabList[0]);
    const [activeTab, setActiveTab] = useState(0)
    const [borderStyle] = useState({ left: 0, width: 0 });
    const [bookingList, setBookingList] = useState([
        {
            payNo: 1,
            roomNo: 1,
            payDay: '2024-10-05 (토)',
            hotelName: '이비스 엠버서더 부산 시티센터',
            checkInDay: '2024-10-06 (일)',
            checkOutDay: '2024-10-07 (월)',
            checkInTime: '15:00',
            checkOutTime: '11:00',
            image: '2b9ba01a5cfcd32ac752258732a5a669.webp',
            roomCancle: 'Y'
        },
        {
            payNo: 2,
            roomNo: 2,
            payDay: '2024-10-10 (월)',
            hotelName: '페어필드 바이 메리어트 서울',
            checkInDay: '2024-10-11 (화)',
            checkOutDay: '2024-10-12 (수)',
            checkInTime: '15:00',
            checkOutTime: '11:00',
            image: '61cd5eb540030.webp',
            roomCancle: 'N'
        }
    ]);

    const handleSelect = (eventKey) => {
        setSelectedDate(dateList[eventKey]);
    };

    const handleSelectTab = (eventKey) => {
        setActiveTab(eventKey);
        setTabText(tabList[eventKey]);

        if (eventKey === 0) {
            setBookingList([{
                payNo: 1,
                roomNo: 1,
                payDay: '2024-10-05 (토)',
                hotelName: '이비스 엠버서더 부산 시티센터',
                checkInDay: '2024-10-06 (일)',
                checkOutDay: '2024-10-07 (월)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '2b9ba01a5cfcd32ac752258732a5a669.webp',
                roomCancle: 'Y'
            },
            {
                payNo: 2,
                roomNo: 2,
                payDay: '2024-10-10 (월)',
                hotelName: '페어필드 바이 메리어트 서울',
                checkInDay: '2024-10-11 (화)',
                checkOutDay: '2024-10-12 (수)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '61cd5eb540030.webp',
                roomCancle: 'N'
            }]);
        } else if (eventKey === 1) {
            setBookingList([{
                payNo: 3,
                roomNo: 3,
                payDay: '2024-10-05 (토)',
                hotelName: '이비스 엠버서더 부산 시티센터',
                checkInDay: '2024-10-06 (일)',
                checkOutDay: '2024-10-07 (월)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '2b9ba01a5cfcd32ac752258732a5a669.webp',
                review: 'Y'
            },
            {
                payNo: 2,
                roomNo: 2,
                payDay: '2024-10-10 (월)',
                hotelName: '페어필드 바이 메리어트 서울',
                checkInDay: '2024-10-11 (화)',
                checkOutDay: '2024-10-12 (수)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '61cd5eb540030.webp',
                review: 'N'
            }]);
        } else {
            setBookingList([{
                payNo: 1,
                roomNo: 1,
                payDay: '2024-10-05 (토)',
                hotelName: '이비스 엠버서더 부산 시티센터',
                checkInDay: '2024-10-06 (일)',
                checkOutDay: '2024-10-07 (월)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '2b9ba01a5cfcd32ac752258732a5a669.webp',
                cancle: 'Y'
            },
            {
                payNo: 2,
                roomNo: 2,
                payDay: '2024-10-10 (월)',
                hotelName: '페어필드 바이 메리어트 서울',
                checkInDay: '2024-10-11 (화)',
                checkOutDay: '2024-10-12 (수)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '61cd5eb540030.webp',
                cancle: 'N'
            }]);
        }


    };

    return (
        <div className='booking--history--container'>
            <div>
                <BackNav title='예약 내역' />
            </div>

            <div className='booking--history--wrap'>
                <div className='dropdown--box'>
                    <Dropdown onSelect={handleSelect} className='dropdown'>
                        <Dropdown.Toggle>
                            {selectedDate}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown--menu">
                            {dateList.map(
                                (dateVal, idx) => (

                                    <Dropdown.Item eventKey={idx}>{dateVal}</Dropdown.Item>

                                ),
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>


                <div className='tab--wrap'>
                    <Nav fill variant="tabs" defaultActiveKey="/home">
                        {tabList.map((tabVal, idx) => (
                            <Nav.Item>
                                <Nav.Link
                                    eventKey={idx}
                                    active={activeTab === idx} // 선택된 탭에 active 속성 추가
                                    onClick={() => handleSelectTab(idx)} // 클릭 시 상태 변경
                                >
                                    {tabVal}
                                </Nav.Link>
                            </Nav.Item>
                        ),
                        )}
                        <div
                            className="border-slide"
                            style={{
                                left: borderStyle.left,
                                width: borderStyle.width,
                            }}
                        />
                    </Nav>
                </div>

                {activeTab === 0 ? (<div className='notify'><span><strong>예약 취소 요청</strong>은 체크인 하루전까지 가능합니다.</span>  </div>)
                    : activeTab === 1 ? (<div className='notify'><span><strong>리뷰 작성</strong>은 체크아웃 당일부터 일주일까지 작성 가능합니다.</span></div>)
                        : null}

                {
                    bookingList.length ? (
                        <div className='bookingList'>
                            {
                                bookingList.map((booking, idx) => (
                                    <BookingHistoryCom key={idx} booking={booking} />
                                ))
                            }
                        </div>
                    )
                        : (
                            <div className='booking--none'>
                                <div className='booking--none--text'>
                                    <span>{selectedDate} 동안 {tabText}가 없습니다.</span>
                                    <span>상품을 예약해보세요</span>
                                </div>

                                <Link to="/" className='home--btn'>홈으로 가기</Link>
                            </div>
                        )

                }

            </div>

            <div>
                <Navbar />
            </div>

        </div>
    )
}
