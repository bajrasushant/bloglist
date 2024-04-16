import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

import { setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";

import { Route, Routes, useMatch } from "react-router-dom";
import { getAllUsers } from "./reducers/allUserReducer";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import BlogDetail from "./components/BlogDetail";
import Navigation from "./components/Navigation";
import { Container, Divider, Typography } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const blogs = useSelector((state) => state.blogs);
  const userMatch = useMatch("users/:id");
  const blogMatch = useMatch("blogs/:id");

  const userById = (id) => allUsers.find((user) => user.id === id);
  const userDetails = userMatch ? userById(userMatch.params.id) : null;

  const blogById = (id) => blogs.find((blog) => blog.id === id);
  const blogDetails = blogMatch ? blogById(blogMatch.params.id) : null;

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(getAllUsers());
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <Container>
      <Notification />
      {user === null && <LoginForm />}
      {user !== null && (
        <div>
          <Navigation user={user} />
          <Typography variant="h3" component="h1">
            Blogs
          </Typography>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {user !== null && (
                <>
                  <NewBlogForm />
                  <Blog signedInUser={user} />
                </>
              )}
            </div>
          }
        />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail user={userDetails} />} />
        <Route
          path="/blogs/:id"
          element={<BlogDetail blog={blogDetails} signedInUser={user} />}
        />
      </Routes>
    </Container>
  );
};
export default App;
