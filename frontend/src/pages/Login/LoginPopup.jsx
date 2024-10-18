import axios from 'axios';
import React, { useEffect } from 'react';

export default function LoginPopup() {
    useEffect(() => {
        const success = window.location.href.includes('success=true');
        const error = window.location.href.includes('error=true');

        if (success) {
            axiosAccessToken();
        } else if (error) {
            alert('로그인 실패했습니다.');
            window.close();
        }
    }, []);

    const axiosAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:9090/reissue', {}, {
                withCredentials: true
            });

            if (response.status === 200) {

                console.log(response);

                // 액세스 토큰 가져오기
                const accessToken = response.headers['access']

                if (window.opener) {

                    //window.opener.localStorage.setItem('accessToken', accessToken); // 토큰 저장하기
                    window.opener.location.href = '/';
                    window.opener = null;
                }

                window.close();
            } else {
                alert('로그인에 실패했습니다.');
                window.close();
            }

        } catch (error) {
            alert('로그인에 실패했습니다.');
            window.close();
        }
    };

    return (
        <div>
            <p>로그인 중...</p>
        </div>
    );
}
