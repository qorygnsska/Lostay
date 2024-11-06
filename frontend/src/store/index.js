import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import timerSlice from "./timerSlice";

const reducers = combineReducers({
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    timer: timerSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'admin', 'timer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
                ignoredPaths: ["some.nested.path"], // 특정 경로 무시
            },
        }),
});

export default store;
