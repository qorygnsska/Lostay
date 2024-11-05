import React, { useEffect, useState } from "react";
import BackNav from "../../../componets/BackNav/BackNav";
import Navbar from "../../../componets/Navbar/Navbar";
import MyPointComponent from "../../../componets/MyPage/MyPoint/MyPoint";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TbParkingCircle } from "react-icons/tb";
import { privateApi } from "../../../api/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




export default function MyPoint() {

    const user = useSelector((state) => state.user.userState);
    const userAt = useSelector((state) => state.user.userAt)
    const navigate = useNavigate();

    useEffect(() => {
        if (user === false || userAt === null) {
            alert("로그인 후 이용해주세요.");
            navigate("/login", { replace: true });

            return;
        }
    }, []);


    const [monthNum, setMonthNum] = useState(0);
    const [pointDatas, setPointDatas] = useState(null)

    const getData = async () => {
        try {
            const response = await privateApi.get(`/point/List?monthNum=${monthNum}`); // API 요청
            setPointDatas(response.data)
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, [monthNum]);


    // 현재 년도
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    // 현재 월
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

    // 오늘 날짜
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;

    // 요일 이름 배열
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    // 월 변경 핸들러
    const changeMonth = (direction) => {
        if (direction === "next") {
            if (!(currentYear === todayYear && currentMonth === todayMonth)) {
                setCurrentMonth((prevMonth) =>
                    prevMonth === 12 ? 1 : prevMonth + 1
                );
                if (currentMonth === 12)
                    setCurrentYear((prevYear) => prevYear + 1);
            }

            setMonthNum(monthNum - 1)
        } else {
            setCurrentMonth((prevMonth) =>
                prevMonth === 1 ? 12 : prevMonth - 1
            );
            if (currentMonth === 1) setCurrentYear((prevYear) => prevYear - 1);

            setMonthNum(monthNum + 1);
        }
    };

    // 버튼 비활성화 조건
    const isPrevDisabled =
        currentYear === todayYear - 1 && currentMonth === todayMonth;
    const isNextDisabled =
        currentYear === todayYear && currentMonth === todayMonth;

    return (
        <div className="mypoint--container">
            <BackNav title="포인트내역" />

            <div className="mypoint--wrap">
                <div className="totalpoint">
                    <div className="title">
                        <TbParkingCircle className="icon" />
                        <span className="text">사용 가능한 포인트</span>
                    </div>

                    <span className="point">
                        {pointDatas ? pointDatas.userPoint.toLocaleString() : 0}
                        <span className="point--unit">P</span>
                    </span>
                </div>

                <div className="notify">
                    <span className="notifiy--text">
                        지난 1년간 적립/사용된 포인트 내역입니다.
                    </span>
                </div>

                <div className="month">
                    <FaChevronLeft
                        onClick={() => changeMonth("prev")}
                        className={`icon ${isPrevDisabled ? "disabled" : ""}`}
                    />
                    <span>{currentMonth}월</span>
                    <FaChevronRight
                        onClick={() => changeMonth("next")}
                        className={`icon ${isNextDisabled ? "disabled" : ""}`}
                    />
                </div>

                <div className="points">
                    {pointDatas?.points.length > 0 ? (
                        pointDatas.points.map((pointData, index) => (
                            <MyPointComponent key={index} pointData={pointData} />
                        ))
                    ) : (
                        <div className="nonePoint"><span>적립/상용된 포인트가 없습니다.</span></div>
                    )}
                </div>
            </div>

            <Navbar />
        </div>
    );
}
