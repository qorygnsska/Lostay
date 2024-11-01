import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { privateApi } from '../../api/api';

export default function LoginPhone() {

    useEffect(() => {
        const error = window.location.href.includes("error=true");

        if (error) {
            alert("로그인 실패했습니다.");
            window.close();
        }
    }, []);

    const postPhoneNum = async (phonenum) => {

        try {
            const response = await axios.post(`http://localhost:9090/sms/loginPhone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };


    const axiosAccessToken = async (phonenum) => {
        try {
            const response = await axios.post(
                `http://localhost:9090/userReissue/newAccess/${phonenum}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                console.log(response);

                // 액세스 토큰 가져오기
                const accessToken = response.headers["authorization"];

                if (window.opener) {

                    // 부모에게 토큰 정보 넘기기
                    window.opener.postMessage({
                        type: 'LOGIN_SUCCESS',
                        payload: { accessToken }
                    }, window.opener.location.origin);
                }

                window.close();
            } else {
                alert("로그인에 실패했습니다.");
                window.close();
            }
        } catch (error) {
            alert("로그인에 실패했습니다.");
            window.close();
        }
    };




    const [phone, setPhone] = useState('');
    const phoneInputRef = useRef(null);
    const [verificationSent, setVerificationSent] = useState(false);
    const verificationCodeRef = useRef(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [timer, setTimer] = useState(180);
    const [isStartTimer, setIsStartTimer] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState("");
    const [serverCode, setServerCode] = useState("")
    const [isVerificationBtnEn, setIsVerificationBtnEn] = useState(true)




    // 휴대폰번호 수정된 값
    const handlePhoneChange = (e) => {
        const formattedPhone = formatPhoneNumber(e.target.value);
        setPhone(formattedPhone);
    };

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

    // 인증번호 전송 버튼 활성화 여부
    const isButtonEnabled = phone.replace(/-/g, "").length === 10 || phone.replace(/-/g, "").length === 11;

    // 인증번호 전송 함수
    const sendVerification = () => {
        setVerificationSent(true);
        setIsStartTimer(true);

        // 인증번호 전송하는 로직
        // 서버에 보내는 코드
        postPhoneNum(phone);
    };

    // 인증번호 재전송 함수
    const resendVerification = () => {
        setTimer(180);
        setIsStartTimer(true);
        setIsVerified(true);
        setIsVerificationBtnEn(true);
        setVerificationCode('');

        // 인증번호 전송하는 로직
        // 서버에 보내는 코드
        postPhoneNum(phone);

    };

    //타이머 함수
    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // 인증번호 확인
    const verifyCode = () => {
        setIsStartTimer(false);
        setIsVerificationBtnEn(false);

        if (verificationCode === serverCode.certificationCode && timer > 0) {
            setIsVerified(true);
            postPhoneNumSave(phone)
            axiosAccessToken(phone);
        } else {
            setIsVerified(false);
            setVerificationMessage("인증번호가 잘못되었습니다.");
        }
    };

    // 전화번호 저장
    const postPhoneNumSave = async (phonenum) => {

        try {
            const response = await privateApi.post(`http://localhost:9090/mypage/UserInfo/phone/${phonenum}`); // API 요청
            setServerCode(response.data);
            return response.data;

        } catch (error) {
            console.error(error);
        }
    };

    // 인증번호 확인 버튼 활성화
    const isVerificationCodeBtnEnabled = verificationCode.length === 6 && isVerificationBtnEn;

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


    return (
        <div className='login--phone--container'>
            <div className='title'>휴대폰 번호를 입력해주세요.</div>
            <div className='sub--title'>본인 인증을 위해 필요합니다.</div>
            <div className='input--box'>
                <input
                    id="inputPhoneNum"
                    ref={phoneInputRef}
                    value={phone}
                    maxLength={13}
                    onChange={handlePhoneChange}
                />
                <button className={`send--num--btn ${!isButtonEnabled && 'disabled'}`}
                    disabled={!isButtonEnabled}
                    onClick={!verificationSent ? sendVerification : resendVerification}
                >
                    {!verificationSent ? "인증번호 전송" : "재전송"}
                </button>
            </div>

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
                        <div>{verificationMessage}</div> // 인증 실패 메시지
                    )}
                </>
            )}
        </div>
    )
}
