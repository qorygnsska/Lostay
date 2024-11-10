import axios from "axios";
import store from "../store"; // Redux 스토어 import
import { adminLogin, adminLogout } from "../store/adminSlice";
//토큰이 필요한 api요청을 보내는 axios인스턴스

export const adminPrivateApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// 요청 인터셉터 설정
adminPrivateApi.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const accessToken = state.admin.adminAT; // Redux에서 accessToken 가져오기

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
adminPrivateApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.config && error.response.data.message === "expired" && error.response.status === 401) {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/adminReissue`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                if (res.status === 200) {
                    // Redux에 새로운 access token 저장
                    const newAccessToken = res.headers["authorization"];

                    if (newAccessToken === null) {
                        store.dispatch(adminLogout());
                        alert('이용시간이 만료되었습니다. 로그인 후 이용해주세요.')
                        window.location.href ='/admin-login';
                        
                    }

                    store.dispatch(adminLogin({ adminState: true, adminAT: newAccessToken }));

                    // 원래 요청을 새로운 access token으로 재시도
                    error.config.headers["Authorization"] = `${newAccessToken}`;
                    return adminPrivateApi(error.config);
                } else {
                    store.dispatch(adminLogout());
                    alert('이용시간이 만료되었습니다. 로그인 후 이용해주세요.')
                    window.location.href ='/admin-login';
                }
            } catch (error) {
                // refresh token 요청 실패 시 로그아웃
                store.dispatch(adminLogout());
                alert('이용시간이 만료되었습니다. 로그인 후 이용해주세요.')
                window.location.href ='/admin-login';
            }
        }

        return Promise.reject(error);
    }
);
