/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (page) => {
  const { data } = await api.fetchPosts(page);
  return data;
});

export const getPost = createAsyncThunk("posts/getPost", async (id) => {
  const { data } = await api.fetchPost(id);
  return data;
});

export const fetchPostsBySearch = createAsyncThunk("posts/fetchPostsBySearch", async (searchQuery) => {
  const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
  return data;
});


export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost) => {
    const response = await api.createPost(newPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }) => {
    const response = await api.updatePost(id, post);
    return response.data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await api.deletePost(id);
  return id;
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const response = await api.likePost(id);
  return response.data;
});

export const commentPost = createAsyncThunk("posts/commentPost", async ({postId, comment}) => {
  console.log("during")
  const { data } = await api.comment(postId, comment);
  return data;
})

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: "idle",
    error: null,
    currentPage: 1,
    numberOfPages: 1,
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = "pending";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.posts = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;

    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [createPost.pending]: (state, action) => {
      state.loading = "pending";
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.posts.unshift(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = "pending";
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [deletePost.pending]: (state, action) => {
      state.loading = "pending";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [likePost.pending]: (state, action) => {
      state.loading = "pending";
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [likePost.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [fetchPostsBySearch.pending]: (state, action) => {
      state.loading = "pending";
    },
    [fetchPostsBySearch.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.posts = action.payload;
    },
    [fetchPostsBySearch.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [getPost.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    },
    [commentPost.pending]: (state, action) => {
      state.loading = "pending";
    },
    [commentPost.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [commentPost.rejected]: (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    }
  },
});


// export const { addPost, removePost, fetchAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
