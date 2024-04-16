import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlogs(newBlog));
    dispatch(initializeBlogs());
  };
};

export const likeBlogs = (content) => {
  return async (dispatch) => {
    await blogService.edit(content);
    dispatch(initializeBlogs());
  };
};

export const removeBlogs = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(initializeBlogs());
  };
};

export const addComments = (blogId, comment) => {
  return async (dispatch) => {
    await blogService.addComment(blogId, comment);
    dispatch(initializeBlogs());
  };
};

export const { setBlogs, appendBlogs, replaceBlog } = blogSlice.actions;
export default blogSlice.reducer;
