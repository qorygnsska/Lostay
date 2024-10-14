import React from 'react'
import BackNav from '../../componets/BackNav/BackNav';
import Navbar from '../../componets/Navbar/Navbar';
import { BsChatText } from "react-icons/bs";
import { FaRegHeart, FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function MyPage() {


    const myinfo = {
        id: 1,
        nickname: '루이지애나포토존05',
        porint: 1000,

    }

    return (
        <div className='mypage--container'>
            <div>
                <BackNav title='MY 스테이' />
            </div>
            <div className='mypage--wrap'>
                <div className='nickname'>
                    <div>
                        <span><strong>{myinfo.nickname}</strong>님</span>
                    </div>

                    <div>
                        <span>안녕하세요</span>
                    </div>
                </div>

                <div className='mypage--info--wrap'>

                    <div className='info--vertical'>
                        <button className='info--btn'>
                            <div>
                                <span>예약내역</span>
                            </div>

                            <div>
                                <FaChevronRight className='icon' />
                            </div>
                        </button>
                    </div>


                    <div className='info--vertical'>
                        <button className='info--btn'>
                            <div>

                                <span>포인트</span>
                            </div>

                            <div>
                                <span className='point'>{myinfo.porint.toLocaleString()}</span>
                                <FaChevronRight className='icon' />
                            </div>
                        </button>

                    </div>


                    <div className='info--horizontal--box'>
                        <div className='info--horizontal'>
                            <button className='info--horizontal--btn'>
                                <div>
                                    <BsChatText className='icon' />
                                </div>

                                <div>
                                    <span>내 리뷰</span>
                                </div>
                            </button>
                        </div>

                        <span className='separation '></span>
                        <div className='info--horizontal'>
                            <Link to="/wishlist" className='info--horizontal--btn'>
                                <div>
                                    <FaRegHeart className='icon' />
                                </div>

                                <div>
                                    <span>찜 목록</span>
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>

                <div className='advertisement'>
                    <img src='eventList/66cde43a8253e3.35660731.png' alt='광고' />
                </div>

                <div className='service--wrap'>
                    <h3>서비스관리</h3>
                    <div className='my--info-setting'>
                        <button className='my--info--btn'>
                            <div>
                                <span>내 정보 관리</span>
                            </div>

                            <div>
                                <FaChevronRight className='icon' />
                            </div>
                        </button>

                    </div>

                    <div className='logout'>
                        <button className='logout--btn'>
                            <div>
                                <span>로그아웃</span>
                            </div>

                            <div>
                                <FaChevronRight className='icon' />
                            </div>
                        </button>

                    </div>
                </div>

                <div className='advertisement'>
                    <img src='eventList/66ed4cda0aabf5.23349304.png' alt='광고' />
                </div>
            </div>

            <div>
                <Navbar />
            </div>
        </div>
    )
}
