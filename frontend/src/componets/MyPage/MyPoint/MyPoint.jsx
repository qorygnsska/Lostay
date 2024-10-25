import React from 'react'

// 날짜변경
const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더합니다.
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
};

// 날짜와 요일 이름 추출
const formatDateWithDay = (dateStr) => {
    const date = new Date(dateStr);

    const day = date.getDate(); // 일
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열
    const dayName = daysOfWeek[date.getDay()]; // 요일 인덱스

    return `${day}일 (${dayName})`; // 형식화된 문자열 반환
};

export default function MyPoint({ pointData }) {
    return (
        <div className='mypoint--component--container'>
            <div className='mypoint--wrap'>

                <span className='point--day'>{formatDateWithDay(pointData.pointDay)}</span>

                <div className='mypoint--use'>
                    <div className='mypoint--title'>
                        <span>{pointData.pointTitle}</span>
                        <span className='point--fulldate'>{formatDate(pointData.pointDay)}</span>
                    </div>

                    <div>
                        <span className={pointData.pointPlusMinus > 0 ? 'plus' : 'minus'}>
                            {pointData.pointPlusMinus > 0 ? `+${pointData.pointPlusMinus.toLocaleString()}` : pointData.pointPlusMinus.toLocaleString()}
                            <span className='point--unit'>P</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
