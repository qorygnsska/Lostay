import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: "timer",
    initialState: {
        pageTimer: 0, // 타이머 값 (남은 시간)
        isTimerActive: false, // 타이머가 활성화된 페이지인지 여부
    },
    reducers: {
        setPageTimer: (state, action) => {
            state.pageTimer = action.payload; // 타이머 값 설정
        },
        setIsTimerActive: (state, action) => {
            state.isTimerActive = action.payload; // 타이머 활성화 여부 설정
        },
    },
});

export let { setPageTimer, setIsTimerActive } = timerSlice.actions;

export default timerSlice;
