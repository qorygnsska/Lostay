import React, { useEffect } from "react";
import "./Login.css";
import BackHeader from "../../componets/BackNav/BackNav";
import { useDispatch } from "react-redux";
import { login } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        const handleLoginMessage = (event) => {
            if (event.data.type === 'LOGIN_SUCCESS') {
                const { accessToken } = event.data.payload;

                // Redux에 액세스 토큰 저장
                dispatch(login({ authState: true, accessToken: accessToken }));
                navigate('/');
            }
        };

        // 메시지 이벤트 리스너 등록
        window.addEventListener('message', handleLoginMessage);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('message', handleLoginMessage);
        };
    }, [dispatch]);

    const onSocialLogin = (social) => {
        const popupUrl = `http://localhost:9090/oauth2/authorization/${social}`;
        const width = 600;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        window.open(
            popupUrl,
            `${social}Login`,
            `width=${width},height=${height},top=${top},left=${left}`
        );

    };

    return (
        <div className="login--container">
            <BackHeader title="로그인" />

            <div className="login--wrap">
                <div className="logo">
                    <h1>로고 들어와야함</h1>
                </div>

                <button
                    onClick={() => onSocialLogin("naver")}
                    className="login--btn navar--btn"
                >
                    <img
                        src="LoginIcon/ic-login-naver.svg"
                        alt="icon"
                        className="icon"
                    />
                    <span>네이버로 시작하기</span>
                </button>
                <button
                    onClick={() => onSocialLogin("kakao")}
                    className="login--btn kakao--btn"
                >
                    <img
                        src="LoginIcon/ic-login-kakao.svg"
                        alt="icon"
                        className="icon"
                    />
                    <span>카카오로 시작하기</span>
                </button>
                <button
                    onClick={() => onSocialLogin("google")}
                    className="login--btn google--btn"
                >
                    <img
                        src="LoginIcon/ic-login-google.svg"
                        alt="icon"
                        className="icon"
                    />
                    <span>Google로 시작하기</span>
                </button>
            </div>
        </div>
    );
}
