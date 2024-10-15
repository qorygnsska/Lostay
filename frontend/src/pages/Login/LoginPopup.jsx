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
            window.close(); // 에러 발생 시 팝업 닫기
        }
    }, []);

    const axiosAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:9090/reissue', {}, {
                withCredentials: true
            });

            if (response.status === 200) {

                console.log(response);
                // 액세스 토큰을 로컬 스토리지나 상태 관리에 저장
                const accessToken = response.headers['access']
                console.log(accessToken)
                // 비동기 작업이 성공적으로 완료된 후 팝업 닫기
                if (window.opener) {

                    //window.opener.localStorage.setItem('accessToken', accessToken);
                    window.opener.location.href = '/'; // 부모 페이지 리다이렉트
                    window.opener = null;
                }

                //  window.close(); // 팝업 닫기
            } else {
                alert('로그인에 실패했습니다.');
                // window.close(); // 에러 발생 시 팝업 닫기
            }

        } catch (error) {
            alert('로그인에 실패했습니다.');
            window.close(); // 에러 발생 시 팝업 닫기
        }
    };

    return (
        <div>
            <p>로그인 중...</p>
        </div>
    );
}
