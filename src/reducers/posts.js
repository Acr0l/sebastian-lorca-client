import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

// Create thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await api.fetchPosts();
  return response.data;
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost) => {
    const response = await api.createPost(newPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, post }) => {
    const response = await api.updatePost(id, post);
    return response.data;
  }
);

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await api.deletePost(id);
  return id;
});

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
  const response = await api.likePost(id);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message;
    },
    [createPost.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = 'idle';
      console.log(action.error.message);
    },
    [deletePost.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = 'idle';
      console.log(action.error.message);
    },
    [likePost.pending]: (state, action) => {
      state.loading = 'pending';
    },
    [likePost.fulfilled]: (state, action) => {
      state.loading = 'idle';
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [likePost.rejected]: (state, action) => {
      state.loading = 'idle';
      console.log(action.error);
    },
  },
});

// export const { addPost, removePost, fetchAllPosts } = postsSlice.actions;
export default postsSlice.reducer;
