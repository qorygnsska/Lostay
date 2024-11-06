import axios from "axios";
import store from "../store"; // Redux 스토어 import
import { login, logout } from "../store/userSlice";
//토큰이 필요한 api요청을 보내는 axios인스턴스

export const privateApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// 요청 인터셉터 설정
privateApi.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.user.aT; // Redux에서 accessToken 가져오기
        console.log(accessToken);
        if (accessToken) {
            config.headers["Authorization"] = `${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//refresh token api
privateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        if (error.config && error.response.data.message === "expired" && error.response.status === 401) {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/userReissue`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                if (res.status === 200) {
                    // Redux에 새로운 access token 저장
                    const newAccessToken = res.headers["authorization"];
                    console.log('newToken', newAccessToken)
                    if (newAccessToken === null) {
                        store.dispatch(logout());
                        alert('이용 시간이 만료되어 로그아웃 됩니다.1')
                        window.location.replace('/login');
                    }

                    store.dispatch(login({ userState: true, aT: newAccessToken }));

                    // 원래 요청을 새로운 access token으로 재시도
                    error.config.headers["Authorization"] = `${newAccessToken}`;
                    return privateApi(error.config);
                } else {
                    store.dispatch(logout());
                    alert('이용 시간이 만료되어 로그아웃 됩니다.2')
                    window.location.replace('/login');
                }
            } catch (error) {
                // refresh token 요청 실패 시 로그아웃
                store.dispatch(logout());
                alert('이용 시간이 만료되어 로그아웃 됩니다.3')
                window.location.replace('/login');
            }
        }

        return Promise.reject(error);
    }
);
