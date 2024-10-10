import React, { useEffect } from 'react';

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
        <div>
            <p>login 이니?</p>
            <button onClick={() => onSocialLogin('naver')}>NaverLogin</button>
            <button onClick={() => onSocialLogin('google')}>GoogleLogin</button>
            <button onClick={() => onSocialLogin('kakao')}>KakaoLogin</button>
        </div>
    );
}

