import { useState } from "react";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>likes {blog.likes}</div>
        <button onClick={toggleVisibility}>hide</button>
      </div>
      </div>
    </div>
  );
};
export default Blog;
