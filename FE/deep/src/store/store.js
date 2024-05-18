import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { memberSlice } from "./memberStore";
import sessionStorage from "redux-persist/es/storage/session";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
    member: memberSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage: sessionStorage,
    whitelist: ["member"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
