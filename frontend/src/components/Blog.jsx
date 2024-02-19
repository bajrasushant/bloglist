import { useState } from "react";
import PropTypes from "prop-types";
const Blog = ({ blog, editBlog, deleteBlog, signedInUser }) => {
  const [visible, setVisible] = useState(false);
  const [hideOrView, setHideOrView] = useState("view");
  const [blogObject, setBlogObject] = useState(blog);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
    setHideOrView(hideOrView === "view" ? "hide" : "view");
  };

  const incrementLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    editBlog(updatedBlog);
    setBlogObject(updatedBlog);
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{hideOrView}</button>
        <div style={showWhenVisible}>
          <a href={`${blog.url}`}>{blog.url}</a>
          <div>
            likes {blogObject.likes}
            <button onClick={incrementLike}>like</button>
          </div>
          <div>{blog.user.username}</div>
          {signedInUser.username === blog.user.username && (
            <button onClick={removeBlog}>remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  signedInUser: PropTypes.object.isRequired,
  editBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
