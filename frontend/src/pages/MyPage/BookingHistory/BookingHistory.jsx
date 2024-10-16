import React, { useState } from 'react'
import BackNav from '../../../componets/BackNav/BackNav';
import Navbar from '../../../componets/Navbar/Navbar';
import { Dropdown, Nav } from 'react-bootstrap';
import BookingHistoryCom from '../../../componets/MyPage/BookingHistory/BookingHistory'

export default function BookingHistory() {

    const dateList = ['최근 3개월', '최근 6개월', '최근 12개월'];
    const tabList = ['예약한 숙소', '이용한 숙소', '취소한 숙소'];

    const [selectedDate, setSelectedDate] = useState(dateList[0]);
    const [activeTab, setActiveTab] = useState(0)
    const [borderStyle] = useState({ left: 0, width: 0 });
    const [bookingList, setBookingList] = useState([{
        payNo: 1,
        payDay: '2024-10-05 (토)',
        hotelName: '이비스 엠버서더 부산 시티센터',
        checkInDay: '2024-10-06 (일)',
        checkOutDay: '2024-10-07 (월)',
        checkInTime: '15:00',
        checkOutTime: '11:00',
        image: '2b9ba01a5cfcd32ac752258732a5a669.webp',
    },
    {
        payNo: 2,
        payDay: '2024-10-10 (월)',
        hotelName: '페어필드 바이 메리어트 서울',
        checkInDay: '2024-10-11 (화)',
        checkOutDay: '2024-10-12 (수)',
        checkInTime: '15:00',
        checkOutTime: '11:00',
        image: '61cd5eb540030.webp',
    }]);

    const handleSelect = (eventKey) => {
        setSelectedDate(dateList[eventKey]);
    };

    const handleSelectTab = (eventKey) => {
        setActiveTab(eventKey);
        // bookingList 설정
        if (eventKey === 0) {
            setBookingList([{
                payNo: 1,
                payDay: '2024-10-05 (토)',
                hotelName: '이비스 엠버서더 부산 시티센터',
                checkInDay: '2024-10-06 (일)',
                checkOutDay: '2024-10-07 (월)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '2b9ba01a5cfcd32ac752258732a5a669.webp',
            },
            {
                payNo: 2,
                payDay: '2024-10-10 (월)',
                hotelName: '페어필드 바이 메리어트 서울',
                checkInDay: '2024-10-11 (화)',
                checkOutDay: '2024-10-12 (수)',
                checkInTime: '15:00',
                checkOutTime: '11:00',
                image: '61cd5eb540030.webp',
            }]);
        } else if (eventKey === 1) {
            setBookingList([{
                payNo: 1,
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

                <div className='notify'>
                    <strong>예약 취소 요청</strong>은 체크인 하루전까지 가능합니다.
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



                <div className='bookingList'>
                    {
                        bookingList.map((booking, idx) => (
                            <BookingHistoryCom key={idx} booking={booking} />
                        ))
                    }
                </div>
            </div>

            <div>
                <Navbar />
            </div>
        </div>
    )
}
