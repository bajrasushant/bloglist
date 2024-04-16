import { Divider, ListItemButton } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

const Blogs = ({ blog }) => {
  const blogStyle = {
    // paddingTop: 10,
    // paddingLeft: 2,
    // border: "solid",
    // borderWidth: 1,
    // marginBottom: 5,
  };

  return (
    <div className="blog_list" style={blogStyle}>
      <div className="blog">
        <div className="title-and-author">
          <ListItemButton
            style={{ textDecoration: "none" }}
            component={Link}
            to={`/blogs/${blog.id}`}
          >
            {blog.title} {blog.author}
          </ListItemButton>
          <Divider />
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blogs key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   signedInUser: PropTypes.object.isRequired,
//   editBlog: PropTypes.func.isRequired,
//   deleteBlog: PropTypes.func.isRequired,
// };
//
//
// <button onClick={toggleVisibility}>{hideOrView}</button>
export default Blog;
