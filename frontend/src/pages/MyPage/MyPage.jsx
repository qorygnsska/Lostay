import React, { useEffect, useState } from "react";
import BackNav from "../../componets/BackNav/BackNav";
import Navbar from "../../componets/Navbar/Navbar";
import { BsChatText } from "react-icons/bs";
import { FaRegHeart, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import OkCancleModal from "../../componets/MyPage/BookingHistory/OkCancleModal";
import { logout } from "../../store/userSlice";
import { privateApi } from "../../api/api";
export default function MyPage() {

    // 로그아웃
    const [isShowModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    const getData = async () => {

        try {
            const response = await privateApi.get('/mypage'); // API 요청

            setProfile(response.data)
            return response.data;

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const showModalToggle = () => {
        setShowModal(!isShowModal)
    }

    const cancelOk = () => {
        userLogout();
        showModalToggle();
    }



    const userLogout = async () => {
        try {
            const ef = await privateApi.post('http://localhost:9090/mypageUser/userLogout'); // API 요청

            if (ef.status === 200) {
                dispatch(logout());
                navigate("/"); // 로그인 페이지로 이동
            }

            return ef;
        } catch (error) {

        }
    }



    return (
        <div className="mypage--container">
            <BackNav title="MY 스테이" />
            <div className="mypage--wrap">
                {/* 닉네임 */}
                <div className="nickname">
                    <div>
                        <span>
                            <strong>{profile?.userNickname}</strong>님
                        </span>
                    </div>

                    <div>
                        <span>안녕하세요</span>
                    </div>
                </div>

                <div className="mypage--info--wrap">
                    {/* 예약내역 링크*/}
                    <div className="info--vertical">
                        <Link to="/booking-history" className="info--btn link">
                            <div>
                                <span>예약내역</span>
                            </div>

                            <div>
                                <FaChevronRight className="icon" />
                            </div>
                        </Link>
                    </div>

                    {/* 포인트내역 링크 */}
                    <div className="info--vertical">
                        <Link to="/my-point" className="info--btn link">
                            <div>
                                <span>포인트</span>
                            </div>

                            <div>
                                <span className="point">
                                    {profile?.userPoint.toLocaleString()}
                                </span>
                                <FaChevronRight className="icon" />
                            </div>
                        </Link>
                    </div>

                    <div className="info--horizontal--box">
                        {/* 내 리뷰 링크 */}
                        <div className="info--horizontal">
                            <Link
                                to="/my-review"
                                className="info--horizontal--btn link"
                            >
                                <div>
                                    <BsChatText className="icon" />
                                </div>

                                <div>
                                    <span>내 리뷰</span>
                                </div>
                            </Link>
                        </div>

                        <span className="separation "></span>

                        {/* 찜목록 링크 */}
                        <div className="info--horizontal">
                            <Link
                                to="/wishlist"
                                className="info--horizontal--btn link"
                            >
                                <div>
                                    <FaRegHeart className="icon" />
                                </div>

                                <div>
                                    <span>찜 목록</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 광고 */}
                <div className="advertisement">
                    <img
                        src="eventList/66cde43a8253e3.35660731.png"
                        alt="광고"
                    />
                </div>

                {/* 서비스 관리 */}
                <div className="service--wrap">
                    <h3>서비스관리</h3>

                    {/* 내 정보 관리 링크 */}
                    <div className="my--info-setting">
                        <Link to="/profile" className="my--info--btn link">
                            <div>
                                <span>내 정보 관리</span>
                            </div>

                            <div>
                                <FaChevronRight className="icon" />
                            </div>
                        </Link>
                    </div>

                    {/* 로그 아웃 링크 */}
                    <div className="logout">
                        <button className="logout--btn" onClick={showModalToggle}>
                            <div>
                                <span>로그아웃</span>
                            </div>

                            <div>
                                <FaChevronRight className="icon" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* 광고 */}
                <div className="advertisement">
                    <img
                        src="eventList/66ed4cda0aabf5.23349304.png"
                        alt="광고"
                    />
                </div>
            </div>
            {/* 예약취소 모달 창 */}
            <OkCancleModal show={isShowModal} onClose={showModalToggle} content={"로그아웃 하시겠습니까?"} cancelOk={cancelOk} />
            <Navbar />
        </div>
    );
}
