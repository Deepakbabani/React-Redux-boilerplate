/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../services/axios";
import { apiPath } from "../../services/apiUrls";
import { getErrorMessage } from "../../utils/utils";

export const login = createAsyncThunk(
  "login",
  async (params: any, thunkAPI) => {
    try {
      const data = await instance
        .post(apiPath.signIn, params)
        .then((response) => {
          return response.data;
        });
      return data;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Types
type AuthState = {
  count: number;
  token: string;
  isLogin: boolean;
};

const initialState: AuthState = {
  count: 0,
  token: "",
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCount: (state, { payload }: PayloadAction<any>) => {
      state.count += payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.token = payload.data?.token;
        state.isLogin = true;
      }
    );
  },
});
const { actions } = authSlice;
export const { setCount } = actions;
export default authSlice.reducer;
