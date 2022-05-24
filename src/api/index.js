import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// Requests for POSTS api
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get("/posts", { params: { page } });
export const fetchPostsBySearch = (searchQuery) => API.get("/posts/search", { params: { searchQuery: searchQuery.search || "none", tags: searchQuery.tags || "empty"} });
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// Requests for USERS api
export const singIn = (formData) => API.post("/user/signin", formData);
export const singUp = (formData) => API.post("/user/signup", formData);
