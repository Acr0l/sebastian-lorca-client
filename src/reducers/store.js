import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.js";
import postReducer from "./posts.js";

const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
