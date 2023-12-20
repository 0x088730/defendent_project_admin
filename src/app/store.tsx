import { configureStore } from "@reduxjs/toolkit";
import getAllData from './history/historySlice'
import getWithdraw from './history/withdrawData'
import auth from './auth/authSlice'
import {useDispatch} from "react-redux"
export const store = configureStore({
    reducer: {
        userData: getAllData,
        withdrawData: getWithdraw,
        auth: auth
    },
});
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;