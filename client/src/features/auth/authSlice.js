import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAction from "./authAPI";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  token: null,
};
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await AuthAction.login(user);
  } catch (error) {
    const msg = error.res.data.msg;
    return thunkAPI.rejectWithValue(msg);
  }
});
export const refreshToken = createAsyncThunk("auth/rfToken", async () => {
  const res = await AuthAction.refreshToken();
  return res.data;
});
export const logout = createAsyncThunk(
  "auth/logout",
  async (token, thunkAPI) => {
    try {
      return await AuthAction.logout(token);
    } catch (error) {
      const msg = error.res.data.msg;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    refreshTokens: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = action.payload;
        state.user = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});
export const { reset, refreshTokens } = authSlice.actions;
export default authSlice.reducer;
