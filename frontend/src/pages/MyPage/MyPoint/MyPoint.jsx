import React, { useState } from 'react'
import BackNav from '../../../componets/BackNav/BackNav';
import Navbar from '../../../componets/Navbar/Navbar';
import MyPointComponent from '../../../componets/MyPage/MyPoint/MyPoint'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbParkingCircle } from "react-icons/tb";

export default function MyPoint() {

    // 받을 데이터
    const data = {
        userPoint: 1300,
        points: [
            { pointDay: "2024-10-18T09:00:00", pointPlusMinus: 100, pointTitle: "예매 추가" },
            { pointDay: "2024-10-18T10:00:00", pointPlusMinus: -100, pointTitle: "예매 사용" },
            { pointDay: "2024-10-16T09:00:00", pointPlusMinus: -1000, pointTitle: "예매 사용" },
            { pointDay: "2024-10-15T09:00:00", pointPlusMinus: -100, pointTitle: "예매 사용" },
            { pointDay: "2024-09-18T09:00:00", pointPlusMinus: -100, pointTitle: "예매 사용" },
            { pointDay: "2024-09-17T09:00:00", pointPlusMinus: 100, pointTitle: "예매 추가" },
            { pointDay: "2024-08-17T09:00:00", pointPlusMinus: 200, pointTitle: "예매 추가" },
            { pointDay: "2024-04-15T09:00:00", pointPlusMinus: 300, pointTitle: "예매 추가" },
            { pointDay: "2024-03-13T09:00:00", pointPlusMinus: -100, pointTitle: "예매 사용" },
            { pointDay: "2023-11-12T09:00:00", pointPlusMinus: -100, pointTitle: "예매 사용" },
            { pointDay: "2023-10-11T10:00:00", pointPlusMinus: 100, pointTitle: "예매 추가" },
            { pointDay: "2023-10-10T09:00:00", pointPlusMinus: 100, pointTitle: "예매 추가" },
            { pointDay: "2023-10-01T09:00:00", pointPlusMinus: 1000, pointTitle: "예매 추가" },
        ]
    }

    // 현재 년도
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    // 현재 월
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

    // 오늘 날짜
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;

    // 요일 이름 배열
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];



    // 월 변경 핸들러
    const changeMonth = (direction) => {
        if (direction === 'next') {
            if (!(currentYear === todayYear && currentMonth === todayMonth)) {
                setCurrentMonth(prevMonth => prevMonth === 12 ? 1 : prevMonth + 1);
                if (currentMonth === 12) setCurrentYear(prevYear => prevYear + 1);
            }
        } else {
            setCurrentMonth(prevMonth => prevMonth === 1 ? 12 : prevMonth - 1);
            if (currentMonth === 1) setCurrentYear(prevYear => prevYear - 1);
        }
    };


    // 선택한 월의 포인트 데이터 계산
    const getMonthlyPoints = () => {
        const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // 선택한 월의 첫번째 날짜
        const endOfMonth = new Date(currentYear, currentMonth, 0); // 선택한 월의 마지막 날

        // 조건에 맞는 데이터 추출함
        return data.points
            .filter(item => {
                const pointDate = new Date(item.pointDay);
                return pointDate >= startOfMonth && pointDate <= endOfMonth;
            })
            .map(item => {
                const date = new Date(item.pointDay);
                const dayOfWeek = date.getDay();
                return {
                    day: `${date.getDate()} (${dayNames[dayOfWeek]})`,
                    fullDate: `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`, // 원하는 형식으로 날짜 변환
                    pointPlusMinus: item.pointPlusMinus > 0 ? `+${item.pointPlusMinus}` : item.pointPlusMinus, // 포인트 부호 추가
                    pointTitle: item.pointTitle
                };
            });
    };

    // 버튼 비활성화 조건
    const isPrevDisabled = (currentYear === todayYear - 1 && currentMonth === todayMonth);
    const isNextDisabled = currentYear === todayYear && currentMonth === todayMonth;

    return (
        <div className='mypoint--container'>
            <BackNav title='포인트내역' />

            <div className='mypoint--wrap'>
                <div className='totalpoint'>
                    <div className='title'>
                        <TbParkingCircle className='icon' />
                        <span className='text'>사용 가능한 포인트</span>
                    </div>

                    <span className='point'>1,300<span className='point--unit'>P</span></span>
                </div>

                <div className='notify'>
                    <span className='notifiy--text'>지난 1년간 적립/사용된 포인트 내역입니다.</span>
                </div>

                <div className='month'>
                    <FaChevronLeft onClick={() => changeMonth('prev')} className={`icon ${isPrevDisabled ? 'disabled' : ''}`} />
                    <span>{currentMonth}월</span>
                    <FaChevronRight onClick={() => changeMonth('next')} className={`icon ${isNextDisabled ? 'disabled' : ''}`} />
                </div>

                <div className='points'>
                    {getMonthlyPoints().map((pointData, index) => (
                        <MyPointComponent key={index} pointData={pointData} />
                    ))

                    }
                </div>
            </div>

            <Navbar />
        </div>
    )
}
