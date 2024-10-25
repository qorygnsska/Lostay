import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userState: false, // 초기값 설정
        accessToken: null,
    },
    reducers: {
        login(state, action) {
            state.userState = action.payload.userState;
            state.accessToken = action.payload.accessToken;
        },
        logout(state) {
            // 로그아웃 시 상태 초기화
            state.userState = false;
            state.accessToken = null;
        },
    },
});

export let { login, logout } = userSlice.actions;

export default userSlice;
