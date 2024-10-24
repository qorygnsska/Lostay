import axios from 'axios';
import store, { login, logout } from '../store/store'; // Redux 스토어 import
//토큰이 필요한 api요청을 보내는 axios인스턴스

export const privateApi = axios.create({
    baseURL: 'http://localhost:9090',
});

// 요청 인터셉터 설정
privateApi.interceptors.request.use((config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken; // Redux에서 accessToken 가져오기

    if (accessToken) {
        config.headers['access'] = `${accessToken}`;
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

            try {
                const res = await axios.post(
                    "http://localhost:9090/reissue",
                    {},
                    {
                        withCredentials: true,
                    }
                );

                if (res.status === 200) {
                    // Redux에 새로운 access token 저장
                    const newAccessToken = res.headers['access'];
                    store.dispatch(login({ authState: true, accessToken: newAccessToken }));

                    console.log(newAccessToken)
                    // 원래 요청을 새로운 access token으로 재시도

                    error.config.headers['access'] = `${newAccessToken}`;
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