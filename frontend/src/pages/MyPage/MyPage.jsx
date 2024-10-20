import React from "react";
import BackNav from "../../componets/BackNav/BackNav";
import Navbar from "../../componets/Navbar/Navbar";
import { BsChatText } from "react-icons/bs";
import { FaRegHeart, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MyPage() {
    const myinfo = {
        id: 1,
        nickname: "루이지애나포토존05",
        porint: 1000,
    };

    return (
        <div className="mypage--container">
            <BackNav title="MY 스테이" />
            <div className="mypage--wrap">
                {/* 닉네임 */}
                <div className="nickname">
                    <div>
                        <span>
                            <strong>{myinfo.nickname}</strong>님
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
                                    {myinfo.porint.toLocaleString()}
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
                        <button className="logout--btn">
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

            <Navbar />
        </div>
    );
}
