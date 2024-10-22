import axios from 'axios';
import { login, logout, store } from '../store/store'; // Redux 스토어 import
//토큰이 필요한 api요청을 보내는 axios인스턴스

export const privateApi = axios.create({
    baseURL: 'http://localhost:9090',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
});

// 요청 인터셉터 설정
privateApi.interceptors.request.use((config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken; // Redux에서 accessToken 가져오기

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

//refresh token api
privateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.config && error.response.data.message === 'expired' && error.response.status === 401) {
            //const refreshToken = getCookie('refreshToken'); // 쿠키에서 refresh token 가져오기
            console.log('리프레쉬 요청함')
            // refresh token 요청
            try {
                const res = await axios.get('http://localhost:9090/reissue', {
                    headers: {
                        //RefreshToken: refreshToken,
                        'Content-Type': 'application/json',
                        withCredentials: true,
                    }
                });

                if (res.status === 200) {
                    // Redux에 새로운 access token 저장
                    const newAccessToken = res.headers['access'];
                    store.dispatch(login({ authState: true, accessToken: newAccessToken }));

                    // 원래 요청을 새로운 access token으로 재시도
                    error.config.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
                    return privateApi(error.config);
                }
            } catch (err) {
                // refresh token 요청 실패 시 로그아웃
                store.dispatch(logout());
            }
        }

        return Promise.reject(error);
    }
);

// 쿠키에서 특정 이름의 값을 가져오는 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}