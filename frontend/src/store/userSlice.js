import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userState: false, // 초기값 설정
        aT: null,
    },
    reducers: {
        login(state, action) {
            state.userState = action.payload.userState;
            state.aT = action.payload.aT;
        },
        logout(state) {
            // 로그아웃 시 상태 초기화
            state.userState = false;
            state.aT = null;
        },
    },
});

export let { login, logout } = userSlice.actions;

export default userSlice;
