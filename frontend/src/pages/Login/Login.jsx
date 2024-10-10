import React, { useEffect } from 'react';
import "./Login.css";
import BackHeader from '../../componets/BackNav/BackNav';


export default function Login() {

    const onSocialLogin = (provider) => {
        const popupUrl = `http://localhost:9080/oauth2/authorization/${provider}`;
        const width = 600;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        window.open(popupUrl, `${provider}Login`, `width=${width},height=${height},top=${top},left=${left}`);
    };

    useEffect(() => {

        const handleMessage = (event) => {
            if (event.origin === 'http://localhost:3000' && event.data?.success !== undefined) {
                if (event.data.success) {
                    window.location.href = '/'; // 홈 화면으로 리다이렉트
                } else {
                    alert(event.data.message); // 실패 메시지 표시
                }
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []); // 의존성 배열이 비어 있어 컴포넌트가 마운트될 때만 실행

    return (
        <>
            <diV>
                <BackHeader title='로그인' />
            </diV>

            <div className='loginWrap'>
                <div className='logoWrap'>
                    <h1>로고 들어와야함</h1>
                </div>


                <button onClick={() => onSocialLogin('naver')} className='loginBtn navarBtn'>
                    <img src='LoginIcon/ic-login-naver.svg' alt='icon' className='icon' />
                    <span>네이버로 시작하기</span>
                </button>
                <button onClick={() => onSocialLogin('kakao')} className='loginBtn kakaoBtn'>
                    <img src='LoginIcon/ic-login-kakao.svg' alt='icon' className='icon' />
                    <span>카카오로 시작하기</span>
                </button>
                <button onClick={() => onSocialLogin('google')} className='loginBtn googleBtn'>
                    <img src='LoginIcon/ic-login-google.svg' alt='icon' className='icon' />
                    <span>Google로 시작하기</span>
                </button>
            </div>
        </>

    );
}

