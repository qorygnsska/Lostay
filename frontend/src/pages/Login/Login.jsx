import React, { useEffect } from "react";
import "./Login.css";
import Navbar from "../../componets/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const user = useSelector((state) => state.user.userState);
    const userAt = useSelector((state) => state.user.userAt)

    useEffect(() => {
        if (user === true && userAt !== null) {

            alert('이미 로그인 중입니다.');
            navigate("/");
            return;
        }


        const handleLoginMessage = (event) => {
            if (event.data.type === "LOGIN_SUCCESS") {
                const { accessToken } = event.data.payload;

                // Redux에 액세스 토큰 저장
                dispatch(login({ userState: true, aT: accessToken }));
                navigate("/");
            }
        };

        // 메시지 이벤트 리스너 등록
        window.addEventListener("message", handleLoginMessage);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener("message", handleLoginMessage);
        };
    }, [dispatch]);

    const onSocialLogin = (social) => {
        const popupUrl = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/${social}`;
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2 - 100.;
        const top = window.innerHeight / 2 - height / 2;

        window.open(popupUrl, `${social}Login`, `width=${width},height=${height},top=${top},left=${left}`);
    };

    return (
        <div className="login--container">
            <div className="login--wrap">
                <div className="logo">
                    <img src="Logo/logo.png" alt="로고 이미지" />
                </div>

                <div className="login--title">
                    <span className="strikethrough"></span>
                    <span className="title">로그인/회원가입</span>
                </div>

                <button onClick={() => onSocialLogin("naver")} className="login--btn navar--btn">
                    <img src="LoginIcon/ic-login-naver.svg" alt="icon" className="icon" />
                    <span>네이버로 시작하기</span>
                </button>
                <button onClick={() => onSocialLogin("kakao")} className="login--btn kakao--btn">
                    <img src="LoginIcon/ic-login-kakao.svg" alt="icon" className="icon" />
                    <span>카카오로 시작하기</span>
                </button>
                <button onClick={() => onSocialLogin("google")} className="login--btn google--btn">
                    <img src="LoginIcon/ic-login-google.svg" alt="icon" className="icon" />
                    <span>Google로 시작하기</span>
                </button>
            </div>

            <Navbar />
        </div>
    );
}
