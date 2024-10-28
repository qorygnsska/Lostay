import React, { useEffect, useRef, useState } from "react";
import BackNav from "../../../componets/BackNav/BackNav";
import Navbar from "../../../componets/Navbar/Navbar";
import { FaPencil } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { privateApi } from "../../../api/api";
import axios from "axios";
import OkCancleModal from "../../../componets/MyPage/BookingHistory/OkCancleModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/userSlice";


export default function Profile() {

    // 데이터 가져오기
    const [profile, setProfile] = useState(null);
    const getData = async () => {

        try {
            const response = await privateApi.get('/mypageEdit'); // API 요청
            console.log(response.data)
            setProfile(response.data)
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        getData();
    }, []);

    useEffect(() => {
        if (profile) {
            setNickname(profile.userNickname || '')
            setPhone(profile.userPhone || '')
            setPrePhone(profile.userPhone || '')
        }
    }, [profile]);

    // 휴대폰 번호 포맷
    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, ""); // 숫자가 아닌 문자 제거
        let formatted = "";

        // 기본 포맷
        if (cleaned.length === 10) {
            // 10자리 포맷: 010-232-2323
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        } else if (cleaned.length === 11) {
            // 11자리 포맷: 010-2323-2323
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
        } else {
            // 기본 포맷
            if (cleaned.length <= 3) {
                formatted = cleaned; // 첫 세 자리까지
            } else if (cleaned.length <= 6) {
                formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`; // 3자리-나머지
            } else if (cleaned.length < 11) {
                formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`; // 3자리-3자리-1자리
            }
        }

        return formatted; // 포맷팅된 전화번호 반환
    }


    // 닉네임 수정
    const [nicknameEdit, setNicknameEidt] = useState(false);
    const [nickname, setNickname] = useState('');
    const nicknameInputRef = useRef(null);
    const [failNicknameEdit, setFailNicknameEdit] = useState(false);

    // 닉네임 수정 버튼
    const handleNicknameEdit = () => {
        setNicknameEidt(!nicknameEdit);

        if (!nicknameEdit) {
            nicknameInputRef.current.focus();
        }
    };

    // 닉네임 수정된 값 저장
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setFailNicknameEdit(false);
    };

    // 닉네임 수정하기 확인버튼 누를 시
    const postNicknameEdit = async () => {

        if (profile.userNickname === nickname) {
            setNicknameEidt(false);
        } else {
            try {
                const response = await privateApi.put(`http://localhost:9090/mypageUserInfo/nickname/${nickname}`); // API 요청

                if (response.status === 200) {
                    setNicknameEidt(false);
                    setFailNicknameEdit(false);
                } else {
                    setFailNicknameEdit(true);
                }

                return response.data;

            } catch (error) {
                setFailNicknameEdit(true);
            }
        }
    };

    // 휴대폰번호 수정

    // 입력된 휴대폰 번호
    const [phone, setPhone] = useState('');

    // 변경 전 휴대폰 번호
    const [prePhone, setPrePhone] = useState('');

    // 휴대폰 수정 On/ Off
    const [phoneEdit, setPhoneEidt] = useState(false);

    // 휴대폰 Input
    const phoneInputRef = useRef(null);

    // 휴대폰 번호 수정 안했을 시 활성화
    const [isVerifiedPhone, setVerifiedPhone] = useState(false);

    // 인증 실패 시 활성화
    const [isVerified, setIsVerified] = useState(false)

    // 보여줄 메시지
    const [verificationMessage, setVerificationMessage] = useState('')

    // 첫 인증번호 보냈는지 확인
    const [verificationSent, setVerificationSent] = useState(false);

    // 인증번호 Input
    const verificationCodeRef = useRef(null);

    // 입력된 인증 번호
    const [verificationCode, setVerificationCode] = useState('');

    // 인증번호 확인 버튼 On/Off
    const [isVerificationBtnEn, setIsVerificationBtnEn] = useState(true)

    // default 타이머 시간
    const [timer, setTimer] = useState(180);

    // 타이머 시작 On/Off
    const [isStartTimer, setIsStartTimer] = useState(false);

    // 서버에서 받은 랜덤 6자리
    const [serverCode, setServerCode] = useState("")

    //타이머 함수
    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // 인증번호 전송 버튼 활성화 여부
    const isButtonEnabled = phone.replace(/-/g, "").length === 10 || phone.replace(/-/g, "").length === 11;

    // 인증번호 확인 버튼 활성화
    const isVerificationCodeBtnEnabled = verificationCode.length === 6 && isVerificationBtnEn;

    // 휴대폰번호 수정 버튼
    const handlePhoneEdit = () => {
        setPhoneEidt(!phoneEdit);
        if (!phoneEdit) {
            phoneInputRef.current.focus();
        }
    };

    // 휴대폰번호 취소 버튼
    const handlePhoneEditCancle = () => {
        setPhoneEidt(!phoneEdit);
        setVerifiedPhone(true);
        setIsVerified(false);
        setVerificationSent(false);
        setVerificationCode('');
        setIsVerificationBtnEn(true);
        setTimer(180);
        setServerCode('');
        setPhone(prePhone)
    };

    // 휴대폰번호 수정된 값
    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhone(formattedPhone);
        setVerifiedPhone(true);
    };



    // 인증번호 전송 함수
    const sendVerification = () => {

        if (phone === prePhone) {
            setVerifiedPhone(false);
            setVerificationMessage("이미 등록된 번호입니다.");
        } else {
            setVerificationMessage("")
            setVerificationSent(true);
            setIsStartTimer(true);

            // 인증번호 전송하는 로직
            // 서버에 보내는 코드
            postPhoneNum(phone);
        }

    };

    // 인증번호 재전송 함수
    const resendVerification = () => {

        if (phone === prePhone) {
            setVerifiedPhone(false);
            setVerificationMessage("이미 등록된 번호입니다.");
        } else {
            setVerificationMessage("");
            setTimer(180);
            setIsStartTimer(true);
            setVerifiedPhone(true)
            setIsVerified(true);
            setIsVerificationBtnEn(true);
            setVerificationCode('');

            // 인증번호 전송하는 로직
            // 서버에 보내는 코드
            postPhoneNum(phone);
        }


    };

    // 인증번호 확인
    const verifyCode = () => {
        setIsStartTimer(false);
        setIsVerificationBtnEn(false);

        if (verificationCode === serverCode.certificationCode && timer > 0) {
            setPhoneEidt(!phoneEdit);
            setVerifiedPhone(true);
            setIsVerified(false);
            setVerificationSent(false);
            setVerificationCode('');
            setIsVerificationBtnEn(true);
            setTimer(180);
            setServerCode('');
            postPhoneNumSave(phone)
            setPrePhone(phone)
            setPhone(phone);
        } else {
            setIsVerified(false);
            setVerificationMessage("인증번호가 잘못되었습니다.");
        }
    };


    // 타이머
    useEffect(() => {
        let interval;

        if (isStartTimer) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setIsStartTimer(false);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, [isStartTimer]);

    // 인증번호 발송
    const postPhoneNum = async (phonenum) => {

        try {
            const response = await axios.post(`http://localhost:9090/loginPhone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    // 전화번호 저장
    const postPhoneNumSave = async (phonenum) => {

        try {
            const response = await privateApi.post(`http://localhost:9090/mypageUserInfo/phone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };


    // 회원 탈퇴
    const [isShowModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showModalToggle = () => {
        setShowModal(!isShowModal)
    }

    const cancelOk = () => {
        userUnsubscript();
        showModalToggle();
        navigate("/", { replace: true });
    }

    const userUnsubscript = async () => {
        try {
            const response = await privateApi.post('http://localhost:9090/mypageUser/unsubscribe'); // API 요청

            if (response.status === 200) {
                dispatch(logout());
            }

            return response.data;
        } catch (error) {

        }
    }

    return (
        <div className="profile--container">
            <BackNav title="내 정보 관리" />

            <div className="profile--wrap">
                <div className="profile--box">
                    <p className="profile--title">개인정보</p>
                    <div className="profile">
                        <div className="profile--child">
                            <div className="profile--child--title">
                                <span>닉네임</span>
                            </div>
                            <div className="profile--edit">
                                <input
                                    ref={nicknameInputRef}
                                    value={nickname}
                                    onChange={handleNicknameChange}
                                    readOnly={!nicknameEdit}
                                    maxLength={15}
                                    placeholder="최대 15자까지만 입력 가능합니다."
                                />
                                <FaPencil
                                    className="icon focus"
                                    onClick={
                                        !nicknameEdit
                                            ? handleNicknameEdit
                                            : null
                                    }
                                />
                            </div>
                        </div>

                        {failNicknameEdit && <div className="wraning--message">이미 존재하는 닉네임 입니다.</div>}

                        <div
                            className={
                                nicknameEdit
                                    ? "nickname--edit--btn focus"
                                    : "hide"
                            }
                            onClick={() => postNicknameEdit()}
                        >
                            확인
                        </div>

                        <div className="profile--child">
                            <div className="profile--child--title">
                                <span>이메일</span>
                            </div>
                            <span>{profile?.userEmail}</span>
                        </div>

                        <div className="profile--child">
                            <div className="profile--child--title">
                                <span>휴대폰번호</span>
                            </div>
                            <div className="profile--edit">
                                <input
                                    ref={phoneInputRef}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    readOnly={!phoneEdit}
                                    placeholder="휴대폰번호 입력"
                                    maxLength={13}
                                />
                                {phoneEdit &&
                                    <button className={`send--num--btn ${!isButtonEnabled && 'disabled'}`}
                                        disabled={!isButtonEnabled}
                                        onClick={!verificationSent ? sendVerification : resendVerification}
                                    >
                                        {!verificationSent ? "인증번호 전송" : "재전송"}
                                    </button>
                                }
                                <FaPencil
                                    className="icon focus"
                                    onClick={
                                        !phoneEdit ? handlePhoneEdit : null
                                    }
                                />
                            </div>
                        </div>

                        {!isVerifiedPhone && (
                            <div className="wraning--message">{verificationMessage}</div> // 인증 실패 메시지
                        )}
                        {verificationSent && (
                            <>
                                <div className='input--box'>
                                    <input
                                        id='verificationCode'
                                        placeholder="인증번호"
                                        ref={verificationCodeRef}
                                        value={verificationCode}
                                        maxLength={6}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                    />
                                    <button onClick={verifyCode} className={`send--num--btn ${!isVerificationCodeBtnEnabled && 'disabled'}`}
                                        disabled={!isVerificationCodeBtnEnabled}
                                    >
                                        확인
                                    </button>
                                    <div className='timer'>
                                        {formatTime()}
                                    </div>
                                </div>
                                {!isVerified && (
                                    <div className="wraning--message">{verificationMessage}</div> // 인증 실패 메시지
                                )}
                            </>
                        )}
                        <div
                            className={
                                phoneEdit ? "phone--edit--btn focus" : "hide"
                            }
                            onClick={handlePhoneEditCancle}
                        >
                            취소
                        </div>
                    </div>

                    <div className="profile--delete" onClick={showModalToggle}>
                        <p>회원탈퇴</p>
                        <FaChevronRight className="icon" />
                    </div>
                </div>
            </div>

            {/* 예약취소 모달 창 */}
            <OkCancleModal show={isShowModal} onClose={showModalToggle} content={"회원탈퇴 하시겠습니까?"} cancelOk={cancelOk} />

            <Navbar />
        </div>
    );
}
