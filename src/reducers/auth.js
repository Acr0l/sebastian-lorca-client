/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ data }) => {
    const response = await api.singIn(data);
    console.log(response.data)
    return response.data;
  }
);
export const signup = createAsyncThunk("auth/signup", async ({ data }) => {
  const response = await api.singUp(data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    loading: false,
    errors: null,
  },
  reducers: {
    auth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      state = {
        ...state,
        authData: action.data,
        loading: false,
        errors: null,
      };
    },
    logoutUser(state) {
      localStorage.clear();

      state = { ...state, authData: null, loading: false, errors: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state = {
        ...state,
        authData: action?.payload,
        loading: false,
        errors: null,
      };
      state.loading = false;
      state.authData = action.payload;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.error.message;
    });
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state = {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      };
      state.loading = false;
      state.authData = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.errors.push(action.error.message);
    });
  },
});

export const { auth, logoutUser } = authSlice.actions;

export default authSlice.reducer;
