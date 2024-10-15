import React, { useEffect } from 'react';

export default function LoginPopup() {
    useEffect(() => {

        const success = window.location.href.includes('success=true');
        const error = window.location.href.includes('error=true');

        if (success) {
            window.opener.location.href = '/';
        } else if (error) {
            alert('로그인 실패했습니다.')
        }

        window.close(); // 팝업 닫기


    }, []);

    return (
        <div>
            <p>로그인 중...</p>
        </div>
    );
}

