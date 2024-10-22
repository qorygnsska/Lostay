import { configureStore, createSlice } from '@reduxjs/toolkit'

let auth = createSlice({
    name: 'auth',
    initialState: {
        authState: false,   // 초기값 설정
        accessToken: null,
    },
    reducers: {
        login(state, action) {
            state.authState = action.payload.authState;
            state.accessToken = action.payload.accessToken;
        },
        logout(state) {
            // 로그아웃 시 상태 초기화
            state.authState = false;
            state.accessToken = null;
        }
    }
})

export let { login, logout } = auth.actions;

export default configureStore({
    reducer: {
        auth: auth.reducer,
    },
});

