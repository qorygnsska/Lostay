import { configureStore, createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        adminState: false, // 초기값 설정
        aT: null,
    },
    reducers: {
        adminLogin(state, action) {
            state.adminState = action.payload.adminState;
            state.aT = action.payload.aT;
        },
        adminLogout(state) {
            // 로그아웃 시 상태 초기화
            state.adminState = false;
            state.aT = null;
        },
    },
});

export let { adminLogin, adminLogout } = adminSlice.actions;

export default adminSlice;
