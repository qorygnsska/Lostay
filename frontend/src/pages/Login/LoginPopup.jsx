import React, { useEffect } from 'react';

export default function LoginPopup() {
    useEffect(() => {
        /**
         * 로그인 성공 여부를 체크하는 함수
         */
        const checkForSuccess = () => {
            const success = window.location.href.includes('success=true');
            const error = window.location.href.includes('error=true');

            if (success) {
                window.opener.postMessage({ success: true }, '*');
            } else if (error) {
                window.opener.postMessage({ success: false, message: '로그인 실패했습니다.' }, '*');
            }

            window.close(); // 팝업 닫기

        };

        const intervalId = setInterval(checkForSuccess, 1000); // 1초마다 체크

        // 컴포넌트 언마운트 시 클리어
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p>로그인 중...</p>
        </div>
    );
}

