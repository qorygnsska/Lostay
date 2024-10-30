import { configureStore, createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        adminState: false, // 초기값 설정
        adminAT: null,
    },
    reducers: {
        adminLogin(state, action) {
            state.adminState = action.payload.adminState;
            state.adminAT = action.payload.adminAT;
        },
        adminLogout(state) {
            // 로그아웃 시 상태 초기화
            state.adminState = false;
            state.adminAT = null;
        },
    },
});

export let { adminLogin, adminLogout } = adminSlice.actions;

export default adminSlice;
