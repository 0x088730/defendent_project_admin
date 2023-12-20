import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "@/global/types";
import axios from "axios";

export const withdrawData = createAsyncThunk(
  "charecters/getAllData",
  async (token: string) => {
    if (token) {
      let res = await axios.post(
        "https://api.dragontown.io/api/v1/user/history/",
        { token }
      );
      return res.data.data;
    }
    return [];
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
      .addCase(withdrawData.fulfilled, (state, action) => {
        let data = [...action.payload];
        data = data.map((obj, id) => {
          return { id: id + 1, ...obj };
        });
        state.data = data;
      })
  },
});
export default characterSlice.reducer;
