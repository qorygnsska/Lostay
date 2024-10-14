import React, { useEffect } from 'react';
import "./Login.css";
import BackHeader from '../../componets/BackNav/BackNav';


export default function Login() {

    const onSocialLogin = (social) => {
        const popupUrl = `http://localhost:9090/oauth2/authorization/${social}`;
        const width = 600;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        window.open(popupUrl, `${social}Login`, `width=${width},height=${height},top=${top},left=${left}`);
    };

    return (
        <div className='login--container'>
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
        </div>

    );
}

