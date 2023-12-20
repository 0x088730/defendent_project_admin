import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "@/global/types";
import axios from "axios";

export const getAllData = createAsyncThunk(
  "charecters/getAllData",
  async (token: string) => {
    if (token) {
      // let res = await fetchData('/user/history', 'POST', {token})
      let res = await axios.post(
        "https://api.dragontown.io/api/v1/user/history/",
        { token }
      );
      return res.data.data;
    }
    return [];
  }
);
export const getDataByWallet = createAsyncThunk(
  "charecters/getDataByWallet",
  async ({ walletAddress, accessToken }: any) => {
    if (walletAddress.startsWith("0x")) {
      // let res = await fetchData('/user/history-by-wallet', 'POST', { walletAddress, accessToken })
      let res = await axios.post(
        "https://api.dragontown.io/api/v1/user/history-by-wallet/",
        { walletAddress, accessToken }
      );
      console.log("wallet", res.data)
      return res.data.data;
    }
    return []
  }
);
const initialState = {
  data: [] as DataType[],
  detail: [] as DataType[],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        let data = [...action.payload];
        data = data.map((obj, id) => {
          return { id: id + 1, ...obj };
        });
        state.data = data;
      })
      .addCase(getDataByWallet.fulfilled, (state, action) => {
        let data = [...action.payload];
        data = data.map((obj, id) => {
          return { id: id + 1, ...obj };
        });
        state.detail = data;
      });
  },
});
export default characterSlice.reducer;
