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
  const [hideOrView, setHideOrView] = useState('view');

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
    setHideOrView(hideOrView === 'view' ? 'hide' : 'view');
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      
        <button onClick={toggleVisibility}>{hideOrView}</button>
      <div style={showWhenVisible}>
          <a href={`${blog.url}`}>{blog.url}</a>
          <div>likes {blog.likes}<button>like</button></div>
          <div>{blog.user.username}</div>
          {console.log(blog)}
          {console.log(blog.user.username)}
      </div>
      </div>
    </div>
  );
};
export default Blog;
