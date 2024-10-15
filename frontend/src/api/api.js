// import axios from "axios";
// import { getCookie, setCookie } from "../hook/cookies"

// export const instance = axios.create({
//     baseURL: "http://localhost:9080",
//     headers: {
//         'Content-Type': 'application/json',
//         withCredentials: true,
//     },
// });
// instance.interceptors.request.use((config) => {
//     if (!config.headers) return config;
//     const accessToken = getCookie("accessToken");

//     if (accessToken) {
//         config.headers["Authorization"] = `${accessToken}`;
//     }
//     return config;
// });

// instance.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (error) => {
//         if (error.config && error.response && error.response.status === 401) {
//             if (error.config._retry) {
//                 return Promise.reject(error); // 이미 재시도한 경우
//             }
//             error.config._retry = true;

//             const refreshToken = getCookie("refreshToken");
//             return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
//                 refreshToken: refreshToken,
//             }).then(async (res) => {
//                 if (res.status === 200 && res.data.accessToken) {
//                     setCookie("Authorization", res.data.accessToken, {
//                         path: '/',
//                         secure: true,
//                         sameSite: 'Strict',
//                     });
//                     error.config.headers["Authorization"] = `${res.data.accessToken}`;
//                     return instance(error.config); // 원래 요청 재시도
//                 }
//             });
//         }
//         return Promise.reject(error);
//     }
// );