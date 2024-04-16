import React from "react";
import { useDispatch } from "react-redux";
import { addComments, likeBlogs, removeBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const BlogDetail = ({ blog, signedInUser }) => {
  const dispatch = useDispatch();

  const updateBlog = async (updatedBlog) => {
    try {
      dispatch(likeBlogs(updatedBlog));
      dispatch(
        setNotification({
          message: `Blog ${updatedBlog.title} was successfully updated`,
          status: "success",
        }),
      );
    } catch (e) {
      dispatch(
        setNotification({ message: "Couldn't update blog", status: "error" }),
      );
    }
  };

  const addNewComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    if (comment) {
      dispatch(addComments(blog.id, { comment }));
      event.target.reset();
    }
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      dispatch(removeBlogs(blogToDelete.id));
      dispatch(
        setNotification({
          message: `${blogToDelete.title} successfully deleted`,
          status: "success",
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({ message: "Couldn't delete blog", status: "error" }),
      );
    }
  };

  const incrementLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(updatedBlog);
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog);
    }
  };

  if (!blog) return null;
  return (
    <Card>
      <CardContent style={{ paddingBottom: "20px" }}>
        <Typography gutterBottom variant="h5">
          {blog.title} {blog.author}
        </Typography>
        <Typography variant="body1" gutterBottom component="a" href={blog.url}>
          {blog.url}
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Typography
              gutterBottom
              variant="body1"
              style={{ marginTop: "10px" }}
            >
              {blog.likes} likes
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  onClick={incrementLike}
                >
                  Like
                </Button>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
        {/* <Typography variant="body2">
          Added by {blog.user?.username}
          {signedInUser.username === blog.user?.username && (
            <Button variant="contained" onClick={removeBlog}>
              Remove
            </Button>
          )}
        </Typography> */}
        <Typography variant="h6">Comments</Typography>
        <form onSubmit={addNewComment} style={{ marginTop: "10px" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <TextField id="comment" label="Add comment" variant="outlined" />
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Add comment
              </Button>
            </Grid>
          </Grid>
        </form>{" "}
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2">None</Typography>
        )}
      </CardContent>
    </Card>
  );
  //   <div className="blog-extra-details">
  //     <h2>
  //       {blog.title} {blog.author}
  //     </h2>
  //     <a className="blogUrl" href={`${blog.url}`}>
  //       {blog.url}
  //     </a>
  //     <div className="blogLikes">
  //       {blog.likes} likes
  //       <button className="like-button" onClick={incrementLike}>
  //         like
  //       </button>
  //     </div>
  //     <div className="blogUsername">added by {blog.user?.username}</div>
  //     {/*   {signedInUser.username === blog.user?.username && (
  //       <button className="delete-button" onClick={removeBlog}>
  //         remove
  //       </button>
  //     )}
  //     */}
  //     <h3>comments</h3>
  //     <form onSubmit={addNewComment}>
  //       <input id="comment" type="text" name="comment" />
  //       <button type="submit">add comment</button>
  //     </form>
  //     {blog.comments && blog.comments.length > 0 ? (
  //       <ul>
  //         {blog.comments.map((comment, i) => (
  //           <li key={i}>{comment}</li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <div>None</div>
  //     )}
  //   </div>
  // );
};

export default BlogDetail;
