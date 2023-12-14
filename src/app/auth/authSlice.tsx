import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "@/global/types";
import axios from "axios";
import { fetchData } from "../../fetchData"

const api = axios.create({
  baseURL: "https://65.21.85.17:8553/api/v1/",
});

export const storage = {
  get(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) { }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) { }
  },
};
export const setAccessTokenAsync = createAsyncThunk(
  "tokenlist/setAccessToken",
  async (tokenKey: string) => {
    return tokenKey;
  }
);


export const login = async (walletAddress: string, dispatch: any, callback: any) => {
  try {
    const res = await fetchData('/user/login', 'POST', { walletAddress })
    // let res = await api.post('user/login/',{walletAddress})
    if (res.accessToken) {

      dispatch(setAccessTokenAsync(res.accessToken))
      dispatch(setLoginStateAsync(true))
      callback()
    }

  } catch (error) {
    alert('The Login Credintial is not exact')
  }
}


export const setLoginStateAsync = createAsyncThunk(
  "admin/setLoginStateAsync",
  async (state: boolean) => {
    return state
  }
);
const initialState = {
  loginState: false,
  accessToken: storage.get("aToken"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLoginStateAsync.fulfilled, (state, action: any) => {
        if (action.payload !== "") {
          state.loginState = action.payload
        }
      })
      .addCase(setAccessTokenAsync.fulfilled, (state, action: any) => {
        if (action.payload !== "") {
          state.accessToken = action.payload;
          localStorage.setItem("aToken", action.payload);
        }
      })

  },
});
export const selectLoginState = (state: any) => state.auth.loginState;
export const selectAccessToken = (state: any) => state.auth.accessToken;
export const selectRefreshToken = (state: any) => state.auth.refreshToken;

export default authSlice.reducer;